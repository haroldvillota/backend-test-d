const request = require('supertest');
const app = require ('../src/app');

const routes = require('../src/routes/contractRoutes');
const { Contract, Job, Profile, sequelize } = require('../src/models');

describe('Test all contracts API', () => {

	beforeAll(async () => {

    });

    afterAll(async () => {
        
    });

	describe('GET /api/contracts', () => {

		beforeEach( async () => {
			
		});


		it('request contract without profile id', async () => {
			response = await request(app).get('/api/contracts');
			expect(response.status).toBe(401);

		});

		it('request contract with bad profile id ', async () => {
			response = await request(app)
				.get('/api/contracts')
				.set('profile_id', 'X');

			expect(response.status).toBe(401);

		});

		it('request contract with right profile id ', async () => {
			response = await request(app)
				.get('/api/contracts')
				.set('profile_id', '1');

			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
			expect(response.body.status).toBeDefined();
			expect(response.body.status).toBe('OK');
			expect(response.body.data).toBeDefined();

		});

		

	});

});
