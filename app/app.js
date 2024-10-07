const express = require('express');
const app = express();
const itemRoutes = require('./routes');
const ExpressError = require('../middleware/expressError');

// Parse incoming request bodies as JSON
app.use(express.json());

// Mount item routes
app.use('/items', itemRoutes); 

// 404 handler for unknown routes
app.use(function(req, res, next) {
    return next(new ExpressError('Not Found', 404));
});

// General error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message
    });
});

module.exports = app;
