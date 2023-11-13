const request = require('supertest');
const app = require('../src/app');  //changed path here

describe('GET /api/weather', () => {
    
    it('should return a specific kind of weather by description', async () => {
        const descriptions = ['sunny', 'rainy', 'cloudy'];
        
        for (const desc of descriptions) {
            const res = await request(app).get(`/api/weather?description=${desc}`);
            
            expect(res.statusCode).toBe(200);
            
            // Expect the array returned to have at least one item matching the description
            const foundWeather = res.body.find(item => item.description === desc);
            expect(foundWeather).toBeDefined();
        }
    });

    it('should return 404 if weather not found by description', async () => {
        const res = await request(app).get('/api/weather?description=NoWeather');  
        expect(res.statusCode).toBe(404);
    });
});
