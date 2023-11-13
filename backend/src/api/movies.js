const express = require('express');
const Joi = require('joi');

const router = express.Router();

const MOVIES = [
    { id: 1, name: "Inception", director: 'Christopher Nolan', release_year: 2010, rating: 8.5 },
    { id: 2, name: "The Shawshank Redemption", director: 'Frank Darabont', release_year: 1994, rating: 7.5 },
    { id: 3, name: "Around the World in 80 Days", director: 'Frank Coraci', release_year: 204, rating: 9.0 },
];

let lastMovieId = MOVIES.length; //get the last id of the movie entered
// -----Get movie name by query param -----------
router.get('/', (req, res) => {
    const { name } = req.query;

    if (name) {
        // If there is a name query parameter, find movies by name
        const movie_by_query = MOVIES.find((movie) => movie.name === name);
        if (!movie_by_query) {
            res.status(404).json({ message: 'Movie Not found by query name' });
        }
        res.json(movie_by_query); // Get movie by given query name
    }
    res.json(MOVIES); // ------Get all movies name-----
});


//-----movie name by id---------------
router.get('/:id', (req, res) => {
    // We need to parse the id first
    const id = parseInt(req.params.id, 10); // Check request id and parse in decimal
    const movie_by_id = MOVIES.find((m) => m.id === id); // Find() gets the first occurrence if true
    // Find from MOVIES array where obj.id === request id
    if (!movie_by_id) {
        res.status(404).json({ message: 'Movie not found by ID' });
    }

    res.json(movie_by_id);
});


//-----------post method--------

//to use Joi validation library we need to define schema
const schema = Joi.object({
    name: Joi.string().required(),
    director: Joi.string().min(3).required(),//min 3 charector
    release_year:Joi.number().required(),
    rating: Joi.number().required()
});
//-----POST---------------
router.post('/',(req,res)=>{
    //validation using Joi library
    const {error} = schema.validate(req.body);// compare the schema from request
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
   
    const movie = {
        id: lastMovieId + 1,//increament from last id
        name: req.body.name,
        director: req.body.director,
        release_year: req.body.release_year,
        rating:req.body.rating
    };
    MOVIES.push(movie);
    res.send(movie);

});

//-----------PUT method------------
router.put('/',(req,res) =>{
    const id = parseInt(req.body.id,10);
    //get the index of the matched movie by id
    const movieIndex = MOVIES.findIndex(m => m.id === id);
    // console.log(movieIndex);
    if(movieIndex === -1) {
        res.status(404).send(" Movie Not found!!!!");
        return;
    }
    // MOVIES[movieIndex].name = req.body.name;
    // MOVIES[movieIndex].director = req.body.director;
    // MOVIES[movieIndex].release_year = req.body.release_year;
    // MOVIES[movieIndex].rating = req.body.rating;
    // res.send(MOVIES[movieIndex]);

    // -------alternative way using obj structure 
    //--Update MOVIES[movieIndex] ex MOVIES[1] movie properties
    MOVIES[movieIndex] = {
        id: req.body.id,
        name: req.body.name,
        director: req.body.director,
        release_year: req.body.release_year,
        rating: req.body.rating,
    };
    res.send(MOVIES[movieIndex]);
});

//-----------DELETE method------------
router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id,10);
    const movie = MOVIES.find(m => m.id === id);
    //console.log("movie"+ movie);
    if(!movie){
        res.status(404).send("Movie Not found!");
        return;
    };

    const index = MOVIES.indexOf(movie);
    //console.log("index "+index);
    // const movieIndex = MOVIES.findIndex(m => m.id === id);
    // console.log("index movie "+ movieIndex);//same movie index using both method
    MOVIES.splice(index,1);//remove element at the index and one element from that index
    res.sendStatus(204); //to send also a messege with res use 200
    
});

module.exports = router;
