const express = require('express');

const router = express.Router();

const Joi = require('joi'); 

const WEATHER = [
    {
        id: 1,
        description: 'sunny',
        image: '☀️',
    },
    {
        id: 2,
        description: 'rainy',
        image: '☔',
    },
    {
        id: 3,
        description: 'cloudy',
        image: '☁️',
    }
];


// GET request
router.get('/', (req, res) => {
    const { description } = req.query;

    if (description) {
        const foundWeather = WEATHER.find(w => w.description === description);

        if (foundWeather) {
            return res.json([foundWeather]);
        } else {
            return res.status(404).json({ message: 'Weather not found by given description' });
        }
    }

    return res.json(WEATHER);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const weather = WEATHER.find(w => w.id === parseInt(id, 10));

    if (weather) {
        return res.json(weather);
    } else {
        return res.status(404).json({ message: 'Weather not found by given ID' });
    }
});


// POST request
// define the schema of the object
const schema = Joi.object({          
    description: Joi.string().min(3).required(),   // assuming the minimum length is 3
    image: Joi.string().required(),
  });

router.post('/',(req, res) => {
    // Validate the req.body against the schema
    // Validate returns an error object if there are validation errors
    const { error } = schema.validate(req.body);

    if (error) {
        //Sending back the error details
        res.status(400).send(error.details[0].message);
        return;
    }

    const weather = {
        id: Math.floor(Math.random() * 100),
        description: req.body.description,
        image: req.body.image,
    }    
    WEATHER.push(weather);
    res.send(weather);
});


// PUT request
router.put('/', (req, res) => {
    const id = parseInt(req.body.id, 10);
    const weatherIndex = WEATHER.findIndex(w => w.id === id);

    if(weatherIndex === -1){
        res.status(404).send("Not found");
        return;
    }

    WEATHER[weatherIndex].description = req.body.description;
    WEATHER[weatherIndex].image = req.body.image;
    res.send(WEATHER[weatherIndex]);
});


// DELETE request
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const weather = WEATHER.find(w => w.id === id);

    if(!weather){
        res.status(404).send("Not Found");
        return;
    };

    const index = WEATHER.indexOf(weather);
    WEATHER.splice(index, 1);
    res.sendStatus(204);
});

module.exports = router;