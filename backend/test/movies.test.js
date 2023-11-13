const request = require('supertest');
const app = require('../src/app');//changed here

describe('GET /api/movies',()=>{
    it('should return a list of movies', async() => {
        const res = await request(app).get('/api/movies'); //request(app) is using the supertest library to send an HTTP GET request to the /api/movies endpoint 
                                                    // of Express application (app). The response stored in the res.
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            { id:1,name: "Inception",director:'Christopher Nolan',release_year: 2010,rating: 8.5},
            { id:2,name: "The Shawshank Redemption",director: 'Frank Darabont',release_year: 1994,rating: 7.5},
            { id:3,name: "Around the World in 80 Days",director: 'Frank Coraci',release_year: 204,rating: 9.0},
        ]);

    });

});

//-------test for POST MOVIES---------------

describe('POST /api/movies', () => {
    it('should add a new movie', async () => {
        const newMovie = {
            name: 'Interstellar',
            director: 'Christopher Nolan',
            release_year: 2014,
            rating: 9.2,
        };

        const res = await request(app)
            .post('/api/movies')
            .send(newMovie);

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);

        expect(res.body.id).toBeTruthy();
        expect(res.body.name).toEqual(newMovie.name);
        expect(res.body.director).toEqual(newMovie.director);
        expect(res.body.release_year).toEqual(newMovie.release_year);
        //expect(res.body.rating).toEqual(newMovie.rating); //Alternatively
        expect(res.body.rating).toEqual(expect.any(Number));//expect for any number in rating

        //-----alternative POST when matching object specifically
        // expect(res.body).toMatchObject({
        //     id: expect.anything(),
        //     name: newMovie.name,
        //     director: newMovie.director,
        //     release_year: newMovie.release_year,
        //     rating: expect.any(Number),
        // });        
    });


});

//------------test for PUT MOVIES---------------

describe('PUT /api/movies', () => {
    it('should update an existing movie', async () => {
        const updatedMovie = {
            id: 1,
            name: 'Inception Updated',
            director: 'Christopher Nolan',
            release_year: 2010,
            rating: 8.8,
        };
        const res = await request(app)
            .put('/api/movies').send(updatedMovie);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            id: 1,
            name: 'Inception Updated',
            director: 'Christopher Nolan',
            release_year: 2010,
            rating: 8.8,
        });
    });

    it('should return 404 if the movie to update is not found', async () => {
        const nonExistingMovie = {
            id: 100,
            name: 'Non-Existing Movie',
            director: 'Unknown Director',
            release_year: 2022,
            rating: 7.0,
        };

        const res = await request(app)
            .put('/api/movies').send(nonExistingMovie);

        expect(res.statusCode).toBe(404);
        expect(res.text).toBe(' Movie Not found!!!!');
    });
});

//------------test for DELETE MOVIE---------------

describe('DELETE /api/movies/:id', () => {
    it('should delete an existing movie', async () => {
        const movieToDeleteId = 1;
        const res = await request(app).delete(`/api/movies/${movieToDeleteId}`);
        expect(res.statusCode).toBe(204);      
    });

    it('should return 404 if the movie to delete is not found', async () => {
        const nonExistingMovieId = 100;
        const res = await request(app).delete(`/api/movies/${nonExistingMovieId}`);

        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('Movie Not found!');
    });
});
