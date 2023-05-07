const request = require('supertest');
const app = require ('../src/app');

describe('Test unpaid jobs API', () => {

	beforeAll(async () => {

    });

    afterAll(async () => {
        
    });

	describe('GET /api/jobs/unpaid', () => {

		beforeEach( async () => {
			
		});


		it('request jobs without profile id', async () => {
			response = await request(app).get('/api/jobs/unpaid');
			expect(response.status).toBe(401);

		});

		it('request jobs with bad profile id ', async () => {
			response = await request(app)
				.get('/api/jobs/unpaid')
				.set('profile_id', 'X');

			expect(response.status).toBe(401);

		});

		it('request jobs with right profile id ', async () => {
			response = await request(app)
				.get('/api/jobs/unpaid')
				.set('profile_id', '1');

			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
			expect(response.body.status).toBeDefined();
			expect(response.body.status).toBe('OK');
			expect(response.body.data).toBeDefined();

			for(let job of response.body.data){
				console.log(job);
				expect(job.paid).toBe(false);
				expect(job.Contract.status).toBe('in_progress');
				expect([job.Contract.ContractorId, job.Contract.ClientId]).toContain(1);
			}

		});

		

	});

});
