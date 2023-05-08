
const ProfileService = require('../services/profileService');
const LogService = require('../services/logService');


exports.deposit = function(req, res) {

	try{

		// There is a lack of information about for what is necessary an userId parameter 
		// if the user is already in profile

		const userId = req.params.userId;

		const profileId = req.profile.id; //??

		const amount = req.body.amount;

		ProfileService.deposit(userId, amount)
		.then(result =>{

	        res.json({ status: 'OK', data:result });
		})
		.catch(error=>{

			LogService.error(error, req);
        	res.status(500).send({ status: "FAILED", error: error.message ? error.message : error });

		})

	}catch(error){

		LogService.error(error, req);
      	res.status(500).send({ status: "FAILED", error: error.message ? error.message : error });
	}

};