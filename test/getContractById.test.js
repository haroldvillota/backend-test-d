const request = require('supertest');
const app = require ('../src/app');

const routes = require('../src/routes/contractRoutes');
const { Contract, Job, Profile, sequelize } = require('../src/models');

describe('Test get contract by id API', () => {

	beforeAll(async () => {

    });

    afterAll(async () => {
        
    });

	describe('GET /api/contracts/{id}', () => {

		beforeEach( async () => {
			
		});


		it('request contract without profile id', async () => {
			response = await request(app).get('/api/contracts/1');
			expect(response.status).toBe(401);

		});

		it('request contract with bad profile id ', async () => {
			response = await request(app)
				.get('/api/contracts/1')
				.set('profile_id', 'X');

			expect(response.status).toBe(401);

		});

		it('request contract with incorrect profile id ', async () => {

			// The contract with id 1 belongs to contractor 5 and client 1

			response = await request(app)
				.get('/api/contracts/1')
				.set('profile_id', '2');

			expect(response.status).toBe(404);
			expect(response.headers['content-type']).toContain('json');
			expect(response.body.status).toBeDefined();
			expect(response.body.status).toBe('FAILED');

		});

		it('request contract with right profile id ', async () => {
			response = await request(app)
				.get('/api/contracts/1')
				.set('profile_id', '1');

			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
			expect(response.body.status).toBeDefined();
			expect(response.body.status).toBe('OK');
			expect(response.body.data).toBeDefined();

		});

		

	});

});
