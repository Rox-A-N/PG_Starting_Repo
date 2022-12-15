const express = require( 'express' );
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
let queryText = 'SELECT * from "songs"';    // SQL query 
pool.query(queryText)   // do query and then
.then((result) => {
    console.log('results from DB', result);
    res.send(result.rows);  // will make our results show up in rows
})  // do callback error function
.catch((error) => {
    console.log('error making a query', error);
    res.sendStatus(500);    // we didn't have this originally and when we ran it is just loaded forever
})
});

// router.get('/:artist', (req, res) => {
//     `SELECT * from songs WHERE artist = ${req.params.artist}`
// });

router.get('/:id', (req, res) => {
    console.log("Hello from get request!", req.params.id);
    const queryText = `SELECT * from songs WHERE id = ${req.params.id};`;
    pool.query(queryText)   // do query and then
.then((result) => {
    console.log(result);
    res.sendStatus(204);  // will make our results show up in rows
})  // do callback error function
.catch((error) => {
    console.log('error making a query', error);
    res.sendStatus(204);    // we didn't have this originally and when we ran it is just loaded forever
    });
});



router.delete('/:id', (req, res) => {
    console.log("Hello from delete request!", req.params.id);
    const queryText = `DELETE from songs WHERE id = ${req.params.id};`;
    pool.query(queryText)   // do query and then
.then((result) => {
    console.log(result);
    res.send(202);  // will make our results show up in rows
})  // do callback error function
.catch((error) => {
    console.log('error making a query', error);
    res.sendStatus(500);    // we didn't have this originally and when we ran it is just loaded forever
    });
});



router.post('/', (req, res) => {    // send the data back w/ this function
    const newSong = req.body;   // req.body goes in the POST
    const queryText = `
    INSERT INTO  "songs" ("rank", "artist", "track", "published")    
    VALUES ($1, $2, $3, $4);    
    `;   // inserting data into the database    (we hardcoded first, then when that worked we used string interpolation)
    // ${newSong.rank}, '${newSong.artist}', '${newSong.track}',' ${newSong.published}'
    pool.query(queryText, [newSong.rank, newSong.artist, newSong.track, newSong.published])
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error making insert query', error);
        res.sendStatus(500);
    })
});

//put request: meaning "update to"
router.put('/rank/:id', (req, res) => {
    console.log('rank id', req.params.id);  // in terminal as rank id (a number)
    console.log('rank body', req.body); // in terminal as rank body {}
    res.sendStatus(200);    // again, reminder---- we need a response to load
})

module.exports = router;    // if error, this may be what is needed