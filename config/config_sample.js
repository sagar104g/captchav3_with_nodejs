var config = {
	"mongo_main": {
		starter: 'mongodb',
		username: 'test',
		password: 'test',
		hosts: 'localhost',
		replicaSet: 'replSetName',
		database: 'dbName'
	},
	"saltRounds": 1,
	"captchaKey": "xxxxxxxx",
	"captchaUrl": "https://www.google.com/recaptcha/api/siteverify?secret=SECRET_KEY&response=TOKEN",
	"botScore": 0.1,
	"servicePort": 4000
};

module.exports = config;