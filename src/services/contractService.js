'use strict';

const { Contract, Job, Profile, sequelize } = require('../models');

const service = {

	/*
	*  Get one contract by id
	*  @return Promise
	*/

	getContractById : function (id) {

		return Contract.findOne(
			{ 
				where: { id } 
			}
		);
		

	}

}

module.exports = service;
