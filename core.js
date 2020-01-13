

var selectUser = function(u) {
	var un = user[u];
	currentUser = u;
	$("#userSelect").val(u);
	$(".cUserAvatar").html(un.avatar);
	switch (u) {
		case 0:
			$("#enterDesk").hide();
			$("#enterUserA").hide();
			$("#enterUserB").hide();
			$("#enterEdiUser").hide();
			$("#enterEdiOfficer").show();
			$("#enterStoreUser").hide();
			$("#enterStoreOfficer").show();
			$("#enterExchUser").hide();
			$("#enterExchOfficer").show();
			break;
		case 1:
			other2Users = {a:2,b:3};
			ui.setUserEnters();
			$("#enterDesk").show();
			$("#enterUserA").show();
			$("#enterUserB").show();
			$("#enterEdiUser").show();
			$("#enterEdiOfficer").hide();
			$("#enterStoreUser").show();
			$("#enterStoreOfficer").hide();
			$("#enterExchUser").show();
			$("#enterExchOfficer").hide();
			break;
		case 2:
			other2Users = {a:1,b:3};
			ui.setUserEnters();
			$("#enterDesk").show();
			$("#enterUserA").show();
			$("#enterUserB").show();
			$("#enterEdiUser").show();
			$("#enterEdiOfficer").hide();
			$("#enterStoreUser").show();
			$("#enterStoreOfficer").hide();
			$("#enterExchUser").show();
			$("#enterExchOfficer").hide();
			break;
		case 3:
			other2Users = {a:1,b:2};
			ui.setUserEnters();
			$("#enterDesk").show();
			$("#enterUserA").show();
			$("#enterUserB").show();
			$("#enterEdiUser").show();
			$("#enterEdiOfficer").hide();
			$("#enterStoreUser").show();
			$("#enterStoreOfficer").hide();
			$("#enterExchUser").show();
			$("#enterExchOfficer").hide();
	}
}



var hideNavbars = function() {
	$(".childHeader").hide();
	$(".homepageHeader").hide();
}

var closeChildPage = function() {
	$(".childPage").hide();
	$("#index").show();
}

var openChildPage = function(pageID) {
	$(".childPage").hide();
	if (pageID == "homepageA" || pageID == "homepageB") {
		$(".homepageHeader").show();
		$(".childHeader").hide();
	} else {
		$(".homepageHeader").hide();
		$(".childHeader").show();
	}
	$("#"+pageID).show();
}






/* ///////////////// 账务事件 /////////////// */
var bank = {
// 浮动汇率计算


// 销毁&生成coin
settleCoin : function(userID, amount) {
	if (amount < 0) {
		// 销毁
		if (user[userID].coin >= -amount) {
			user[userID].coin -= -amount;
			console.log("settleCoin -- ",user[userID].avatar+user[userID].name," 🔥"+amount);
		} else {
			ui.toast("Not enough 🔥.")
			console.log("settleCoin -- ",user[userID].avatar+user[userID].name+" has not enough 🔥.")
			// return false
		}
	} else {
		// 生成
		user[userID].coin += amount;
		console.log("settleCoin -- ",user[userID].avatar+user[userID].name," 🔥+"+amount);
	}
	return bank
}


// coin转账
,transferCoin : function(from, to, amount) {
	if (user[from].coin >= amount) {
		bank.settleCoin(from,-amount).settleCoin(to,amount);
	} else {
		ui.toast("Not enough 🔥.")
		console.log("transferCoin -- ",user[from].avatar+user[from].name+" has not enough 🔥.");
	}
	return bank
}


// 提取&发放现金
,settleCash : function(userID, amount) {
	if (amount < 0) {
		// 销毁
		if (user[userID].cash >= -amount) {
			user[userID].cash -= -amount;
			console.log("settleCash -- ",user[userID].avatar+user[userID].name," 💵"+amount);
		} else {
			ui.toast("Not enough 💵.")
			console.log("settleCash -- ",user[userID].avatar+user[userID].name+" has not enough 💵.");
			// return false
		}
	} else {
		// 生成
		user[userID].cash += amount;
		console.log("settleCash -- ",user[userID].avatar+user[userID].name," 💵+"+amount);
	}
	return bank
}

// 现金转账
,transferCash : function(from, to, amount) {
	if (user[from].cash >= amount) {
		bank.settleCash(from,-amount).settleCash(to,amount);
	} else {
		ui.toast("Not enough 💵.")
		console.log("transferCash -- ",user[from].avatar+user[from].name+" has not enough 💵.");
	}
	return bank
}

// 现金coin互转
,cash2Coin : function(cashFrom, cashTo, cashAmount) {
	var coa = cashAmount * sExRate;
	if (user[cashFrom].cash >= cashAmount) { // 用户有钱
		if (cashTo != cashFrom) { 				// 不是向自己买币
			if (user[cashTo].coin >= coa) { 		// 对方有币
				bank.transferCash(cashFrom, cashTo, cashAmount).transferCoin(cashTo, cashFrom, coa);
			} else {
				ui.toast("没有足够的🔥可售。");
			}
		} else {
			ui.toast("❌ 不能和自己交易。");
		}
	} else {
		ui.toast("没有足够的💵。");
	}
	return bank
}
,coin2Cash : function(coinFrom, coinTo, coinAmount) {
	var caa = coinAmount / sExRate;
	if (user[coinFrom].coin >= coinAmount) { // 用户有币
		if (coinTo != coinFrom) { 				// 不是向自己提现
			if (user[coinTo].cash >= caa) { 		// 对方有现金
				bank.transferCash(coinTo, coinFrom, caa).transferCoin(coinFrom, coinTo, coinAmount);
			} else {
				ui.toast("没有足够的💵可提取。");
			}
		} else {
			ui.toast("❌ 不能和自己交易。");
		}
	} else {
		ui.toast("没有足够的🔥。");
	}
	return bank
}



}



/* ///////////////// 资源事件 ///////////////// */
var market = {
// 统计内容总量
updateContentAmount : function() {
	var ncmemo = 0,
		gcmemo = 0;
	for (var upci = 1; upci <= user.length - 1; upci++) {
		ncmemo += user[upci].NCAmount;
		gcmemo += user[upci].GCAmount;
	}
	NCA = ncmemo;
	GCA = gcmemo;
	return market
}


// 发布内容
,createContent : function(userID, num) {
	if (userID) {
		user[userID].NCAmount += num;
		ui.toast("✉️ + " + num);
	}
	return market
}

// 投稿到编辑部
,submitContent : function(userID) {
	if (userID) {
		if (user[userID].NCAmount >= 1) { // 是否有普通稿
			if (user[userID].coin >= cSubmitPrice) { // 是否有足够币
				// 转币
				bank.transferCoin(userID,0,cSubmitPrice);
				ui.toast("投稿成功。");
			} else {
				ui.toast("没有足够的 🔥。");
			}
		} else {
			ui.toast("没有普通稿件");
		}
	}
	return market
}

// 升级为优质内容
,upgradeContent : function(userID) {
	if (userID) {
		if (user[userID].NCAmount >= 1) { // 是否有普通稿
			if (user[0].coin >= GCP) {// 国库是否有币
				// 转稿
				user[userID].NCAmount --;
				user[userID].GCAmount ++;
				// 转币
				bank.transferCoin(0,userID,GCP);
				ui.toast("一篇稿件已升级！")
			} else {
				ui.toast("国库没有足够的 🔥。");
			}
		} else {
			ui.toast("没有普通稿件");
		}
	}
	return market
}

// 降级内容
,degradeContent : function(userID) {
	if (userID) {
		if (user[userID].GCAmount >= 1) { // 是否有优质稿
			user[userID].coin -= GCP // 强制收回币
			console.log("degradeContent -- 强制收回🔥");
			bank.settleCoin(0,GCP);
			user[userID].GCAmount --;
			user[userID].NCAmount ++;
			ui.toast("⚠️ 降级了一篇稿件");
		} else {
			ui.toast("没有优质稿件");
		}
	}
	return market
}

// 删除内容（涉及coin处理）
,deleteNC : function(userID) {
	if (userID) {
		if (user[userID].NCAmount >= 1) { // 是否有普通稿
			user[userID].NCAmount --;
			ui.toast("⚠️ 删除了一篇普通稿件");
		} else {
			ui.toast("没有普通稿件");
		}
	}
	return market
}
,deleteGC : function(userID) {
	if (userID) {
		if (user[userID].GCAmount >= 1) { // 是否有优质稿
			user[userID].coin -= GCP // 强制收回币
			bank.settleCoin(0,GCP);
			user[userID].GCAmount --;
			ui.toast("⚠️ 删除了一篇优质稿件");
		} else {
			ui.toast("没有优质稿件");
		}
	}
	return market
}



// 用户购买礼品
,buyGift : function(userID, giftID, num) {
	var totalCoin = gift[giftID].price * num;
	if (user[userID].coin >= totalCoin) { // 用户有足够的币
		bank.transferCoin(userID,0,totalCoin); // 转币
		user[userID].giftsBox[giftID] += num; // 发放商品
	} else {
		ui.toast("没有足够的 🔥。");
	}
	return market
}

// 礼品转送
,giveGift : function(from, to, giftID, num) {
	if (user[from].giftsBox[giftID] >= num) { // 有足够库存
		// 扣礼品
		user[from].giftsBox[giftID] -= num;
		// 礼品折算币（涉及抽成）
		var g2c = gift[giftID].price * num;
		if (giftRakeSwitch) {
			var ra = g2c * giftRake;
			g2c -= ra;
			bank.settleCoin(0,ra);
		}
		bank.settleCoin(to,g2c);
		ui.toast("已赠 " + gift[giftID].img + "~~");
	} else {
		ui.toast("没有足够的" + gift[giftID].img);
	}
	return market
}

// 设置礼品价格




}








