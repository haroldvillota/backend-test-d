'use strict';

const { Op } = require('sequelize');
const { Contract, Job, Profile, sequelize } = require('../models');

const service = {

	/*
	*  Get one contract by id and with contractor or client equals to profileId
	*  @return Promise
	*/

	getContractById : function (id, profileId) {

		return Contract.findOne(
			{ 
				where: { 
					id,
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
		);
		

	}

}

module.exports = service;
