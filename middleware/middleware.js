const ExpressError = require("./expressError");

function logger(req, res, next){
    console.log(req.method, req.path);
    next();
}