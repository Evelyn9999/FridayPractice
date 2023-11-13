const request = require('supertest');
const app = require('../src/app');

describe('GET /api/weather/:id', () =>{ 
    it('should return a specific kind of weather', async () => {
        const res = await request(app).get('/api/weather/1');                                                       
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            id:1,
            description:'sunny',
            image:'☀️',
        });
    });

    it('should return a specific kind of weather', async () => {
        const res = await request(app).get('/api/weather/2');                                                       
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            id:2,
            description:'rainy',
            image:'☔',
        });
    });

    it('should return a specific kind of weather', async () => {
        const res = await request(app).get('/api/weather/3');                                                       
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            id:3,
            description:'cloudy',
            image:'☁️',
        });
    });
});
