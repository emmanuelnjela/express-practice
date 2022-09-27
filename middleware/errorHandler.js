const { logEvents } = require("./logEvents")

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: [${err.message}]`, 'error.txt');
    next();
}

module.exports = errorHandler