const request = require('supertest');
const app = require('./../src/app');
const sequelize = require('./../src/models');
const User = require('./../src/models/user');

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await User.create({ balance: 10000 });
});

describe('Balance Down API', () => {
    jest.setTimeout(100000);

    test('should handle 10000 balance-down requests', async () => {
        const userId = 1;
        const amount = 2;
        const numRequests = 10000;
        const batchSize = 100; // Adjust batch size as needed

        // Process requests in batches
        for (let i = 0; i < numRequests; i += batchSize) {
            const batchPromises = [];

            // Send requests in current batch
            for (let j = 0; j < batchSize; j++) {
                const promise = request(app)
                    .post('/balance-down')
                    .send({ userId, amount })
                    .then(response => {
                        if (response.body.success) {
                            expect(response.body.balance).toBeGreaterThanOrEqual(0);
                        } else {
                            expect(response.body.error).toBe('Insufficient funds');
                        }
                    });

                batchPromises.push(promise);
            }

            // Wait for all requests in current batch to complete
            await Promise.all(batchPromises);
        }
    });
});

afterAll(async () => {
    await sequelize.close();
});
