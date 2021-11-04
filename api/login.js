const path=require('path');

module.exports = {
	post: (req, res) => {
		const {userName, password} = req.body;
		const session = req.session;
		//sleep(3000);
		if(userName === "admin" && password === "admin") {
			if(session) {
				if(session.userInfo) {
					res.json({err: "You are already logged in!"});
				}
				else {
					session.userInfo = {
						userName,
						password
					}
					res.json({
						err: null,
						retInfo: {}
					});
				}
			}
			else {
				res.json({err: "No session" });
			}
		}
		else {
			res.json({err: "Username or password error"});
		}
	}
};
