const express = require("express");
const router = express.Router();

const jobController = require('../controllers/jobController');


/**
 * @openapi
 * /api/jobs/unpaid:
 *   get:
 *     summary: Get all unpaid jobs
 *     description: Returns a list of all unpaid jobs with active contract and belonging to a user (client or contractor)
 *     tags:
 *       - Jobs
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


router.get('/unpaid', (req, res) => jobController.getAllUnpaidJobs(req, res));



module.exports = router;

