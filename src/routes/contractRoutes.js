const express = require("express");
const router = express.Router();

const contractController = require('../controllers/contractController');


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
 *                      username:
 *                        type: string
 *                        description: The user name.
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

