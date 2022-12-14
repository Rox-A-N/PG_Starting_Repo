const pg = require( 'pg' ); //this and everything below is taken from musicLibrary.js

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


module.exports = pool;