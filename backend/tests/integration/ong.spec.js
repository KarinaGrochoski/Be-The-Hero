const request = require('supertest');
const app = require('../../src/app');
const connecction = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connecction.migrate.rollback();
        await connecction.migrate.latest();
    });

    afterAll(async () => {
        await connecction.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name:"APAD",
            email:"contato@contato.com",
            whatsapp:"41999999999",
            city:"Curitiba",
            uf:"PR"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});