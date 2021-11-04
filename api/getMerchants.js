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
	if(country && country.length>0) {
		swhere=" where country='"+country+"'";
	}
	if(merchant && merchant.length>0) {
		if(swhere.length>0)
			swhere+=" and ";
		else
			swhere+=" where ";
		swhere+=" name like '%"+merchant+"%'";

	}
	let sql="select * from merchants"+swhere;
	db.query(sql,[],function(ret){
		fn(ret);
	});

}