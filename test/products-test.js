const request = require('supertest')

const app = 'http://localhost:3000'

describe('Products', () => {
    it('returns all products', async () => {
        const response = await request(app)
        .get('/')
    })
})