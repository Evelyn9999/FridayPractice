const request = require('supertest');
const app = require('../src/app');//changed path here


// test for GET request
describe('GET /api/weather',()=>{
    it('should return a list of weather', async() => {
        const res = await request(app).get('/api/weather'); 
                                                
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            {
                id:1,
                description:'sunny',
                image:'☀️',
            },
            {
                id:2,
                description:'rainy',
                image:'☔',
            },
            {
                id:3,
                description:'cloudy',
                image:'☁️',
            }
        ]);
    });
});


// test for POST request
describe('The POST /api/weather endpoint', () => {
    it('should show a kind of weather', async () => {
        const newWeather = {
            description: 'rainy',
            image: "☔",
        };

       const response = await request(app)
        .post('/api/weather')
        .set('content','application/json')
        .send(newWeather);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeTruthy();
        expect(response.body.description).toEqual(newWeather.description);
    });

    // validation that if there is description
    it('should not allow no description', async () => {
        const newWeather = {
            image: "☔",
        };

       const response = await request(app)
        .post('/api/weather')
        .set('content','application/json')
        .send(newWeather);

        expect(response.statusCode).toBe(400);
        expect(response.body.id).toBeFalsy();
        expect(response.text).toEqual('"description" is required');
    });

    // validation that if the description is too short
    it('should not allow too short description', async () => {
        const newWeather = {
            description: "AS",
            image: "☔",
        };

       const response = await request(app)
        .post('/api/weather')
        .set('content','application/json')
        .send(newWeather);

        expect(response.statusCode).toBe(400);
        expect(response.body.id).toBeFalsy();
        expect(response.text).toEqual('"description" length must be at least 3 characters long');
    });
});


// test for PUT request
describe('The PUT /api/weather endpoint', () => {
    it('should update an existing weather', async () => {
      const testWeather = {
        description: "rainy",
        image: "☔",
      };

      const createResponse = await request(app)
        .post('/api/weather')
        .set('Accept', 'application/json')
        .send(testWeather);
      const postId = createResponse.body.id;
      
      const weather = {
        id: postId,
        description: "rainy",
        image: "☔",
      }
      
      const response = await request(app)
        .put('/api/weather')
        .set('Content', 'application/json')
        .send(weather);

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.id).toBe(postId);
      expect(response.body.description).toEqual(weather.description);
      expect(response.body.image).toEqual(weather.image);
    });
  });


// test for DELETE request 
describe('The DELETE /api/weather endpoint', () => {  
    test('should delete the weather by id', async () => {
      const weather = {
        description: 'Test Description Delete',
        image: 'Stupid Image Delete',
      };

      const createResponse = await request(app)
        .post('/api/weather')
        .set('Accept', 'application/json')
        .send(weather);

      const postId = createResponse.body.id;

      const response = await request(app)
        .delete(`/api/weather/${postId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(204);
    });
  });
