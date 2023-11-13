const request = require('supertest');
const app = require('../src/app'); 

describe('GET /api/movies?name=moiveName', () => {
  it('should return given movies by name', async () => {

    const res = await request(app).get('/api/movies?name=Inception');//using query by passing movie name
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ id: 1, name: 'Inception', director: 'Christopher Nolan', release_year: 2010, rating: 8.5 }
    );
  });

  //----- if wrong query name givetest thisn than it should ------
  it('should return 404 if movie not found', async () => {
    const res = await request(app).get('/api/movies?name=NoMovie');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ message: 'Movie Not found by query name' });
  });

});
