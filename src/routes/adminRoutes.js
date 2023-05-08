const express = require("express");
const router = express.Router();

const adminController = require('../controllers/adminController');


/**
 * @openapi
 * /api/admin/best-profession:
 *   get:
 *     summary: Get the best profession
 *     description: Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *         description: The start date
 *         example: 2020-08-15
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *         description: The end date
 *         example: 2020-08-18
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


router.get('/best-profession', (req, res) => adminController.getBestProfession(req, res));


/**
 * @openapi
 * /api/admin/best-clients:
 *   get:
 *     summary: Get the best clients
 *     description: returns the clients the paid the most for jobs in the query time period.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *         description: The start date
 *         example: 2020-08-15
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *         description: The end date
 *         example: 2020-08-18
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *         description: The max rows
 *         example: 2
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


router.get('/best-clients', (req, res) => adminController.getBestClients(req, res));

module.exports = router;

