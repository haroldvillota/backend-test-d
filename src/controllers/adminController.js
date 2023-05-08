
const AdminService = require('../services/adminService');
const LogService = require('../services/logService');


exports.getBestProfession = function(req, res) {

	try{

		const profileId = req.profile.id;

		const startDate = new Date(req.query.start);
		const endDate = new Date(req.query.end);

		AdminService.getBestProfession(startDate, endDate)
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