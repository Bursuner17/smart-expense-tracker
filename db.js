const { Pool } = require('pg');

const pool = new Pool({
    user: 'default', // replace with your PostgreSQL username
    host: 'ep-proud-sky-a4vg9rw8-pooler.us-east-1.aws.neon.tech',
    database: 'expense-tracker', // replace with your database name
    password: 'oH9spqIN5YCE', // replace with your PostgreSQL password
    port: 5432, // default PostgreSQL port
    ssl: {
        rejectUnauthorized: false, // this allows self-signed certificates
    },
});

module.exports = pool;
