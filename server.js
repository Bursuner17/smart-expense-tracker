const express = require('express');
const pool = require('./db'); 
const routes = require('./routes');  // Import your routes
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);  // Use the routes

// Debugging logs
console.log("Starting server...");

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
