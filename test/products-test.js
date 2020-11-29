const request = require('supertest')

const app = require('../src/app')

describe('Products', () => {
    it('returns all products', async () => {
        const response = await request(app)
        .get('/')
    })
})