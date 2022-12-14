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

router.post('/', (req, res) => {    // send the data back w/ this function
    const newSong = req.body;   // req.body goes in the POST
    const queryText = `
    INSERT INTO "songs" ("rank", "artist", "track", "published")    
    VALUES (${newSong.rank}, '${newSong.artist}', '${newSong.track}',' ${newSong.published}');    
    `;   // inserting data into the database    (we hardcoded first, then when that worked we used string interpolation)
    pool.query(queryText)
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error making insert query', error);
        res.sendStatus(500);
    })
})

module.exports = router;    // if error, this may be what is needed