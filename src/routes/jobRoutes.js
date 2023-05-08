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


/**
 * @openapi
 * /api/jobs/{job_id}/pay:
 *   post:
 *     summary: Pay for a job
 *     description: Pay for a job specified by the id if the client have enough balance
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user
 *       - in: path
 *         name: job_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the job to pay
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
 *                        description: The job ID.
 */

router.post('/:job_id/pay', (req, res) => jobController.payForAJob(req, res));



module.exports = router;

