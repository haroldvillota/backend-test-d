const express = require("express");
const router = express.Router();

const contractController = require('../controllers/contractController');


/**
 * @openapi
 * /api/contracts:
 *   get:
 *     summary: Get all contracts
 *     description: Returns a list of all non terminated contracts belonging to a user (client or contractor)
 *     tags:
 *       - Contracts
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: 
 *                     type: object
 *                   
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"             
 */


router.get('/', (req, res) => contractController.getAllContracts(req, res));


/**
 * @openapi
 * /api/contracts/{id}:
 *   get:
 *     summary: Get a contract by id
 *     description: Returns the contract corresponding to the specified id only if it belongs to the logged in user
 *     tags:
 *       - Contracts
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the contract
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                      id:
 *                        type: integer
 *                        description: The contract ID.
 *
 *                   
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"             
 */


router.get('/:id', (req, res) => contractController.getContractById(req, res));



module.exports = router;

