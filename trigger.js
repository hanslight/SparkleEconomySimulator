$( function () {

document.body.addEventListener('touchstart', function () {});

//////////// INIT ///////////////

ui.initUserSelect();
selectUser(currentUser);
market.updateContentAmount();



/////////// PAGES ///////////
// global
// 更新用户选择器
$("#userSelect").bind("change", function() {
	var u = $("#userSelect").val()*1;
	selectUser(u);
});

// 子页面入口
$(".enter").bind("click", function() {
	var tit = $(this).html();
	$(".childHeader .title").html(tit);
	$("#userSelect").hide();
	$("#index").hide();
});

// 导航返回键
$(".btnBack").bind("click", function() {
	$("#userSelect").show();
	closeChildPage();
	hideNavbars();
})

// toast
$(".toast").bind("click",function(){$(this).fadeOut(120)});




// desk
$("#enterDesk").bind("click", function() {
	openChildPage("desk");
	ui.setDashboard("#d1-1");
});
$("#btnCreate1").bind("click", function() {
	market.createContent(currentUser,1);
	ui.setDashboard("#d1-1");
	market.updateContentAmount();
});
$("#btnCreateRandom").bind("click", function() {
	var rd = Math.floor(Math.random()*100+10);
	market.createContent(currentUser,rd);
	ui.setDashboard("#d1-1");
	market.updateContentAmount();
});








// homepage A
$("#enterUserA").bind("click", function(){
	openChildPage("homepageA");
	$("#index").hide();
	var ua = user[other2Users.a].avatar,
		un = user[other2Users.a].name;
	$(".homepageHeader .bigAvatar").html(ua);
	$(".homepageHeader .userName").html(un);
	ui.setGiftBox().setDashboard("#d2-1",other2Users.a);
	
	$("#homepageA #give0").bind("click",function() {
		market.giveGift(currentUser,other2Users.a,0,1);
		ui.updateGiftBox("A",0).setDashboard("#d2-1",other2Users.a);
	});
	$("#homepageA #give1").bind("click",function() {
		market.giveGift(currentUser,other2Users.a,1,1);
		ui.updateGiftBox("A",1).setDashboard("#d2-1",other2Users.a);
	});
	$("#homepageA #give2").bind("click",function() {
		market.giveGift(currentUser,other2Users.a,2,1);
		ui.updateGiftBox("A",2).setDashboard("#d2-1",other2Users.a);
	});

	$("#userSelect").hide();
});






// homepage B
$("#enterUserB").bind("click", function(){
	openChildPage("homepageB");
	$("#index").hide();
	var ua = user[other2Users.b].avatar,
		un = user[other2Users.b].name;
	$(".homepageHeader .bigAvatar").html(ua);
	$(".homepageHeader .userName").html(un);
	ui.setGiftBox().setDashboard("#d2-2",other2Users.b);

	$("#homepageB #give0").bind("click",function() {
		market.giveGift(currentUser,other2Users.b,0,1);
		ui.updateGiftBox("B",0).setDashboard("#d2-2",other2Users.b);
	});
	$("#homepageB #give1").bind("click",function() {
		market.giveGift(currentUser,other2Users.b,1,1);
		ui.updateGiftBox("B",1).setDashboard("#d2-2",other2Users.b);
	});
	$("#homepageB #give2").bind("click",function() {
		market.giveGift(currentUser,other2Users.b,2,1);
		ui.updateGiftBox("B",2).setDashboard("#d2-2",other2Users.b);
	});

	$("#userSelect").hide();
});







// editorial user
$("#enterEdiUser").bind("click", function() {
	openChildPage("ediUser");
	ui.setDashboard("#d3-1");
});
$("#btnSubmit").bind("click", function() {
	market.submitContent(currentUser);
	ui.setDashboard("#d3-1");
});




// editorial officer
$("#enterEdiOfficer").bind("click", function() {
	openChildPage("ediOfficer");
	ui.setDashboard("#d4-1").initUserTabs();
	var uti = 1;
	$(".userTab").bind("click", function() {
		uti = $(this).prev("input").val();
		ui.setDashboard("#d4-2",uti);
	})
	$("#eut1").prop("checked",true);
	ui.setDashboard("#d4-2",uti);
	$("#btnUpgradeContent").unbind().bind("click", function() {
		market.upgradeContent(uti).updateContentAmount();
		ui.setDashboard("#d4-1").setDashboard("#d4-2",uti);
	});
	$("#btnDegradeContent").unbind().bind("click", function() {
		market.degradeContent(uti).updateContentAmount();
		ui.setDashboard("#d4-1").setDashboard("#d4-2",uti);
	});
	$("#btnOfficerDelNC").unbind().bind("click", function() {
		market.deleteNC(uti).updateContentAmount();
		ui.setDashboard("#d4-1").setDashboard("#d4-2",uti);
	});
	$("#btnOfficerDelGC").unbind().bind("click", function() {
		market.deleteGC(uti).updateContentAmount();
		ui.setDashboard("#d4-1").setDashboard("#d4-2",uti);
	});
});



// exchange user
$("#enterExchUser").bind("click", function() {
	openChildPage("exchUser");
	ui.setDashboard("#d5-1");
	ui.setDashboard("#d5-2");
});
$("#btnBuyCoin").bind("click", function(){
	bank.cash2Coin(currentUser,0,1);
	ui.setDashboard("#d5-1");
	ui.setDashboard("#d5-2");
});
$("#btnSellCoin").bind("click", function(){
	bank.coin2Cash(currentUser,0,1);
	ui.setDashboard("#d5-1");
	ui.setDashboard("#d5-2");
});



// exchange officer
$("#enterExchOfficer").bind("click", function() {
	openChildPage("exchOfficer");
	ui.setDashboard("#d6-1");
	ui.setDashboard("#d6-2");
});


// store user
$("#enterStoreUser").bind("click", function() {
	openChildPage("storeUser");
	ui.setDashboard("#d7-1").setGiftWindow();
	// for (var gj = 0; gj <= gift.length - 1; gj++) {
		$("#btnBuyGift"+0).bind("click", function(){
			market.buyGift(currentUser,0,1);
			ui.setDashboard("#d7-1");
		});
		$("#btnBuyGift"+1).bind("click", function(){
			market.buyGift(currentUser,1,1);
			ui.setDashboard("#d7-1");
		});
		$("#btnBuyGift"+2).bind("click", function(){
			market.buyGift(currentUser,2,1);
			ui.setDashboard("#d7-1");
		});
	// }
});


// store officer
$("#enterStoreOfficer").bind("click", function() {
	openChildPage("storeOfficer");
	ui.setGiftEditor();
});





})