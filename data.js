

var currentUser = 1,
	other2Users = {a:0,b:0};

var toastTimer;







var sExRate = 1, // 🔥/💵
	NCA = GCA = 0; // 内容数量统计


// 策略
var cSubmitPrice = 1, // 投稿费用（统一的）
	GCP = 10, // 优质内容稿酬
	giftRakeSwitch = true, // 送礼抽成
	giftRake = .2;


// 用户数据
var user = [{
	name : "OFFICER", // user[0] 是国库
	avatar : "⚙️",
	cash : 10000,
	coin : 10000
},
{
	name : "大虎虎",
	avatar : "🐡",
	NCAmount : 2,
	GCAmount : 0,
	cash : 100,
	coin : 0,
	giftsBox : [5,0,0]
},
{
	name : "cruz",
	avatar : "👧",
	NCAmount : 0,
	GCAmount : 0,
	cash : 0,
	coin : 0,
	giftsBox : [5,0,0]
},
{
	name : "嵇子",
	avatar : "💂",
	NCAmount : 0,
	GCAmount : 0,
	cash : 300,
	coin : 0,
	giftsBox : [5,0,0]
}]



// 礼品数据
var gift = [
{
	img: "🍥",
	price: 0.2
},
{
	img: "🍹",
	price: 5
},
{
	img: "👒",
	price: 99
}]




