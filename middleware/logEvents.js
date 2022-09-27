const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");
const fsPromise = fs.promises;

const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');

const logEvents = async (message, logFile) => {
    let logsDir = path.join(__dirname,"..", "logs"); 

    try {
        if(!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)
        await fsPromise.appendFile(path.join(logsDir, logFile),`${dateTime}\t${uuid()}\t${message}\n`)
    } catch (err) {
        console.log(`${err.name}: ${err.message}`)
    }
}

const logger = (req, res, next) => {
    console.log(req.method, req.url)
    logEvents(`${req.method} ${req.url}`, 'reqLogs.txt');
    next();
}

module.exports = {logEvents, logger};