const db=require('../sqlite/liteDb');

module.exports = {
	get: (req, res) => {
		searchMerchant(req, function(ret) {
			res.json(ret);
		});
	},
};

function searchMerchant(req, fn) {
	let country=req.query.country;
	let merchant=req.query.merchant;
	let swhere="";
	let param=[];
	if(country && country.length>0) {
		swhere=" where country=?";
		param.push(country);
	}
	if(merchant && merchant.length>0) {
		if(swhere.length>0) {
			swhere+=" and ";
		} else {
			swhere+=" where ";
		}		
		swhere+="name like ?";
		param.push("%"+merchant+"%");
	}
	let sql="select * from merchants"+swhere;
	db.query(sql,param,function(ret){
		fn(ret);
	});

}