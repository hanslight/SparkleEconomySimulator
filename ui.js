var ui = {


// 根据用户加载User A B
setUserEnters : function() {
	var ua = user[other2Users.a],
		ub = user[other2Users.b];
	$("#enterUserA").html(ua.avatar+"&nbsp;"+ua.name+" 的主页");
	$("#enterUserB").html(ub.avatar+"&nbsp;"+ub.name+" 的主页");
	return ui
},


// 加载gifts
setGiftWindow : function() {
	var gw = "";
	// <li><div class='giftImg'></div><div class='btn' id='btnBuyGift0'></div></li>
	for (var gi = 0; gi <= gift.length - 1 ; gi++) {
		gw += "<li><div class='giftImg'>";
		gw += gift[gi].img;
		gw += "</div><div class='btn' id='btnBuyGift"+gi+"'>🔥";
		gw += gift[gi].price;
		gw += "&nbsp;购买</div></li>";
	}
	$("#storeUser .giftWindow").html("").append(gw);
	return ui
},
setGiftBox : function() {
	var gb = "";
	// <li><div class='giftImg'><div class='giftReserve'></div></div><div class='btn' id='give1'></div></li>
	for (var gj = 0; gj <= gift.length - 1 ; gj++) {
		gb += "<li><div class='giftImg'>" + gift[gj].img;
		gb += "<div class='giftReserve' id='gRsv" + gj + "'>" + user[currentUser].giftsBox[gj];
		gb += "</div></div><div class='btn' id='give" + gj + "'>赠送</div></li>";
	}
	$(".giftBox").html("").append(gb);
	return ui
},
updateGiftBox : function(userTo, giftID) { // userTo = "A" or "B"
	$("#homepage" + userTo + " #gRsv" + giftID).html(user[currentUser].giftsBox[giftID]);
	return ui
},
setGiftEditor : function() {
	var ge = "";
	// <li><div class='giftImg'>iii</div><div><input type='number' id='giftPrice1' value='999'></div></li>
	for (var gk = 0; gk <= gift.length - 1 ; gk++) {
		ge += "<li><div class='giftImg'>" + gift[gk].img + "</div>";
		ge += "<div>🔥 <input type='number' id='giftPrice" + gk;
		ge += "' value='" + gift[gk].price + "'></div></li>"
	}
	$(".giftEditor").html("").append(ge);
	return ui
},

setDashboard : function(boardID,userID) {
	var data;
	if (!userID) {userID = currentUser};
	switch (boardID) {
		case "#d1-1":
			data = [
				{
					item: "🔥",
					value: user[userID].coin.toFixed(1)
				},{
					item: "💵",
					value: user[userID].cash.toFixed(1)
				},{
					item: "✉️",
					value: user[userID].NCAmount
				},{
					item: "💌",
					value: user[userID].GCAmount
				}
			];
			break;
		case "#d2-1":
			data = [
				{
					item: "🔥",
					value: user[userID].coin.toFixed(1)
				},{
					item: "✉️",
					value: user[userID].NCAmount
				},{
					item: "💌",
					value: user[userID].GCAmount
				}
			];
			break;
		case "#d2-2":
			data = [
				{
					item: "🔥",
					value: user[userID].coin.toFixed(1)
				},{
					item: "✉️",
					value: user[userID].NCAmount
				},{
					item: "💌",
					value: user[userID].GCAmount
				}
			];
			break;
		case "#d3-1":
			data = [
				{
					item: "🔥",
					value: user[userID].coin.toFixed(1)
				},{
					item: "✉️",
					value: user[userID].NCAmount
				},{
					item: "💌",
					value: user[userID].GCAmount
				}
			];
			break;
		case "#d4-1":
			data = [
				{
					item: "🔥",
					value: user[0].coin.toFixed(1)
				},{
					item: "✉️",
					value: NCA
				},{
					item: "💌",
					value: GCA
				}
			];
			break;
		case "#d4-2":
			data = [
				{
					item: "🔥",
					value: user[userID].coin.toFixed(1)
				},{
					item: "✉️",
					value: user[userID].NCAmount
				},{
					item: "💌",
					value: user[userID].GCAmount
				}
			];
			break;
		case "#d5-1":
			data = [
				{
					item: "💱",
					value: sExRate.toFixed(2)
				}
			];
			break;
		case "#d5-2":
			data = [
				{
					item: "🔥",
					value: user[userID].coin.toFixed(1)
				},{
					item: "💵",
					value: user[userID].cash.toFixed(1)
				}
			];
			break;
		case "#d6-1":
			data = [
				{
					item: "💱",
					value: sExRate.toFixed(2)
				}
			];
			break;
		case "#d6-2":
			data = [
				{
					item: "🔥",
					value: user[0].coin.toFixed(1)
				},{
					item: "💵",
					value: user[0].cash.toFixed(1)
				}
			];
			break;
		case "#d7-1":
			data = [
				{
					item: "🔥",
					value: user[userID].coin.toFixed(1)
				}
			];
			break;
		default:
			ui.toast("Dashboard does not exist.");
			return ui
	}

	var db = "";
	if (data.length == 1) {
		db += "<span class='dashboardItemPrimary'>" + data[0].item;
		db += "&nbsp;" + data[0].value + "</span>";
	} else {
		for (var di = 0 ; di <= data.length - 1 ; di++) {
			// <span class='dashboardItem'>🔥 0</span>
			db += "<span class='dashboardItem'>" + data[di].item;
			db += "&nbsp;" + data[di].value + "</span>";
		}
	}
	$(boardID).html("").append(db);
	return ui
},



// toast
toast : function(txt) {
	$(".toast").show().append(txt + "&nbsp;&nbsp;&nbsp;");
	clearTimeout(toastTimer);
	toastTimer = setTimeout( function(){
		$(".toast").fadeOut(120);
		setTimeout(function(){$(".toast").html("")},120);
	},1200);
	return ui
},




// 编辑部用户页签
initUserTabs : function() {
	var userTabs = "<form>";
	for (var uti = 1; uti <= user.length - 1; uti++) {
		// <form><input name='utname' id='eut1' type='radio' value='1' /><label for='eut1' class='userTab'><div class='tUserAvatar'></div><div class='tUserName'></div></label></form>
		userTabs += "<input name='utname' id='eut" + uti + "' type='radio' value='" + uti + "' />";
		userTabs += "<label for='eut" + uti + "' class='userTab'>";
		userTabs += "<div class='tUserAvatar'>" + user[uti].avatar + "</div>";
		userTabs += "<div class='tUserName'>" + user[uti].name + "</div></label>";
	}
	$(".userTabs").html(userTabs + "</form>");
	return ui
},



// footer用户选择器
initUserSelect : function() {
	var selectUserList = "<select id='userSelect'>";
	for (var usi = 0; usi <= user.length - 1; usi++) {
		// <option value="1">大虎虎</option>
		selectUserList +=  "<option value='" + usi + "'>" + user[usi].name + "</option>"
	}
	$(".select").html(selectUserList + "</select>");
	return ui
}




};

