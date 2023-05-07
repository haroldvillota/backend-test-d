
const ContractService = require('../services/contractService');
const LogService = require('../services/logService');

exports.getContractById = function(req, res) {

	try{

		const id = req.params.id;

		const profileId = req.profile.id;

		ContractService.getContractById(id, profileId)
		.then(contract =>{

			if(contract){
	         	res.json({ status: 'OK', data:contract });
	        }else{
	         	res.status(404).send({ status: "FAILED", error: `Contract not found` });
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


exports.getAllContracts = function(req, res) {

	try{

		const profileId = req.profile.id;

		ContractService.getAllContracts(profileId)
		.then(contracts =>{

			if(contracts){
	         	res.json({ status: 'OK', data:contracts });
	        }else{
	         	res.status(404).send({ status: "FAILED", error: `Contracts not found` });
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