const request = require('supertest');
const app = require('../src/app');

describe('This GET /api/movies/:id', () =>{ //this block use get method to check each country by id
    it('should return a specific movie', async () => {
        const res = await request(app).get('/api/movies/1');//request(app) fuc uses supertest and send http get to the 
                                                            // /api/movies/:1 endpoint of express(app) aplication 
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id:1,name: "Inception",director:'Christopher Nolan',release_year: 2010,rating: 8.5});
    });

    it('should return a specific movie', async () => {
        const res = await request(app).get('/api/movies/2');//request(app) fuc uses supertest and send http get to the 
                                                            // /api/movies/:1 endpoint of express(app) aplication 
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id:2,name: "The Shawshank Redemption",director: 'Frank Darabont',release_year: 1994,rating: 7.5},
        );
    });

    it('should return 404 if movie not found', async () => {
        const res = await request(app).get('/api/movies/99');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message:'Movie not found by ID'});
      });

});