'use strict';

const { Op } = require('sequelize');
const { Contract, Job, Profile, sequelize } = require('../models');

const service = {

	
	/*
	*  Get all unpaid jobs with an active contract and contractor or client equals to profileId
	*  @return Promise
	*/

	getAllUnpaidJobs : function (profileId) {

		return Job.findAll(
			{ 
				
				where: { paid: false },
				include: { 
					model: Contract, 
					where: {  
						status : 'in_progress',
						[Op.or]: [
					        {
					          ClientId: profileId,
					        },
					        {
					          ContractorId: profileId,
					        },
					    ],
					}
				}
			}
		);
		
	}

}

module.exports = service;
