const express = require("express");
const router = express.Router();

const balancesController = require('../controllers/balancesController');

/**
 * @openapi
 * /api/balances/deposit/{userId}:
 *   post:
 *     summary: Deposit money
 *     description: Deposits money into the balance of a client, a client can't deposit more than 25% his total of jobs to pay.
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user to deposit
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 example: 100
 *             required:
 *               - amount
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
 *                        description: The user ID.
 */

router.post('/deposit/:userId', (req, res) => balancesController.deposit(req, res));


module.exports = router;

