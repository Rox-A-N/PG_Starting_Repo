const express = require( 'express' );
const router = express.Router();
const pg = require( 'pg' );

const Pool = pg.Pool;   // Pool is a method in the pg library- pool of connection (to our db)

const pool = new Pool({
    database: 'lydian_intro',   // snake case example
    host: 'localhost',
    port: 5432,
    max: 10,    // max amount of connections/query that can happen at once
    idleTimeoutMillis: 30000    // 30 secs, if it takes longer than 30 sec, cancel the query
}); // the above is a configuration then we're done with it

pool.on( 'connect', () => {
    console.log( 'postgres is connected' ); // console to see if its connected
});

pool.on( 'error', (error) => {
    console.log( 'error with postgres pool', error );   // shows us the error message
});

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
    VALUES (${newSong.rank}, ${newSong.artist}, ${newSong.track}, ${newSong.published});
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