
const JobService = require('../services/jobService');
const LogService = require('../services/logService');


exports.getAllUnpaidJobs = function(req, res) {

	try{

		const profileId = req.profile.id;

		JobService.getAllUnpaidJobs(profileId)
		.then(jobs =>{

			if(jobs){
	         	res.json({ status: 'OK', data:jobs });
	        }else{
	         	res.status(404).send({ status: "FAILED", error: `Jobs not found` });
	        }
			
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

exports.payForAJob = function(req, res) {

	try{

		const jobId = req.params.job_id;

		const profileId = req.profile.id;

		JobService.payForAJob(jobId, profileId)
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