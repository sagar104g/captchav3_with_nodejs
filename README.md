REQUIREMENTS:
1.node 10.16.0+.
2.mongodb 4.0+.
3.google Captcha v3 API keys.

THINGS TO REMEMBER:
1. mongoDB should be password protected.
2. userData will be stored in userData collection and ip address are stored in ipCollection collection.
3. ipCollection should have a index with expireAfterSeconds feild eg:- db.ipCollection.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 86400 } ), so ip address will be destroyed after a certain number of seconds.
4. if you registered your captcha with localhost then it will not work with your private ip address.
5. mongodb should be a replicaset .

SETUP GUIDE:
1. setup config.js file in config folder with the help of sample_config.js
2. botScore in config file is used for comparison the score given by google captcha 0.0 is most likely bot and 1.0 is most likely human.
3. mongoDb should in running state.

NOTE:- this repo. is tested on ubuntu 18.04 system and crome  Version 81.0.4044.92 (Official Build) (64-bit)