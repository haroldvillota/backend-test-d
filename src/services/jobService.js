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
		
	},

	/*
	*  A client can pay a Job if he has enough on his balance
	*  The data is updated with a transaction and asynchronous approach
	*  @return Promise
	*/

	payForAJob : function (jobId, profileId) {

		return new Promise((resolve, reject) => {

			Job.findOne(
				{ 
					where: { id: jobId },
					include: { 
						model: Contract,
						where: {
							ClientId: profileId,
						},
						include: [
							{
								model: Profile,
								as: 'Client'
							},
							{
								model: Profile,
								as: 'Contractor'
							}
						]

					}
				}
			)
			.then((job) => {
				
				//Validations
				console.log(job.toJSON())
				if(job){

					if(job.paid){
						throw "The job is already paid";	
					}else{

						if(job.Contract.Client.balance >= job.price){
							return job;
						}else{
							throw "Not enough balance";
						}

					}

				}else{
					throw "The job is not found";
				}

			})
			.then (job => {

				//Updates

				sequelize.transaction()
				.then(t => {
					Promise.all([
						job.update({ 
							paid: true,
							paymentDate: sequelize.literal('CURRENT_TIMESTAMP')
						}, { transaction: t }),
						job.Contract.Client.decrement({ balance : job.price }, { transaction: t }),
						job.Contract.Contractor.increment({ balance : job.price }, { transaction: t })
					])
					.then((results) => {
						t.commit().then(() => resolve(job) )
					})
					.catch(error => {
						t.rollback()
						.then(() => {
							throw error
						})
					})
				})

			})

			.catch(error => {
				reject(error);
			})

		});

		
	}

}

module.exports = service;
