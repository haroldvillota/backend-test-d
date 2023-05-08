'use strict';

const { Op } = require('sequelize');
const { Contract, Job, Profile, sequelize } = require('../models');

const service = {

	/*
	*  
	*  @return Promise
	*/

	getBestProfession : function (start, end) {

		return new Promise((resolve, reject) => {
			Job.findAll(
				{ 
					attributes: ['price','paymentDate',[sequelize.fn('SUM', sequelize.col('price')), 'totalEarned']],
					include: { 
						model: Contract,
						attributes: ['status'],
						include: {
							model: Profile,
							as: 'Contractor',
							attributes: ['profession'],
						}
						
					},
					where: { 
						paid: true,
						paymentDate: { [Op.between]: [start, end] },
					},
					group: 'Contract.Contractor.profession',
					order: [['totalEarned', 'DESC']]
				}
			)
			.then(result => {
				if(result && result.length>0){
					let best = result[0].toJSON();
					resolve({
						profession: best.Contract.Contractor.profession,
						totalEarned: best.totalEarned
					});	
				}else{
					reject(result);
				}
				
			})
			.catch(error => {
				reject(error);
			})
		})
		
	},


	/*
	*  
	*  @return Promise
	*/

	getBestClients : function (start, end, limit = 2) {

		return new Promise((resolve, reject) => {
			Job.findAll(
				{ 
					attributes: [
						[sequelize.fn('SUM', sequelize.col('price')), 'paid'],
					],
					include: { 
						model: Contract,
						attributes: ['id'],
						include: {
							model: Profile,
							as: 'Client',
							attributes: ['id','firstName','lastName'],
						}
						
					},
					where: { 
						paid: true,
						paymentDate: { [Op.between]: [start, end] },
					},
					group: 'Contract.Client.id',
					order: [['paid', 'DESC']],
					limit: limit
				}
			)
			.then(result => {
				if(result && result.length>0){

					let bestsClientsFormatted = result.map( element =>{
						return {
							id: element.Contract.Client.id,
							fullName: element.Contract.Client.firstName + ' ' + element.Contract.Client.lastName,
							paid: element.paid
						}
					})
					resolve(bestsClientsFormatted);	

				}else{
					reject(result);
				}
				
			})
			.catch(error => {
				reject(error);
			})
		})
		
	},

}


module.exports = service;
