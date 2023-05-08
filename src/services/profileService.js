'use strict';

const { Op } = require('sequelize');
const { Contract, Job, Profile, sequelize } = require('../models');

const service = {

	/*
	*  A client can deposit up to 25% of total of jobs to pay
	*  @return Promise
	*/

	deposit : function (profileId, amount) {

		return new Promise((resolve, reject) => {

			// query for total of unpaid jobs
			Job.sum('price',
				{ 
					where: { paid: false },
					include: { 
						model: Contract,
						where: {
							ClientId: profileId,
						}
					}
				}
			)
			.then((result) => {
				
				if(result){

					const maxDeposit = result * 0.25;

					if(amount <= maxDeposit){
						
						// a transaction is not necessary because only one table will be updated
						
						Profile.increment(
							{ 
								balance: amount
							},
							{
								where: { id: profileId }
							}
						)
						.then( (result) => {
							resolve(result);
						})
						.catch( error => {
							throw error;
						})

					}else{
						throw "The amount exceeds the maximum allowed";	
					}
					
				}else{
					throw "The client don't have upaid jobs";
				}

			})

			.catch(error => {
				reject(error);
			})

		});

		
	}

}

module.exports = service;
