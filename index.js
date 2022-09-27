// 1. create server with express app
// 2. serve different files with route handles
// 3. use middleware to manipulate the req and res 
// 4. handle request and errors
// 5. manipulate apis
// 6. implement routers
// 7. handle cors( cross orign resourse sharing )

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const { logger } = require("./middleware/logEvents");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler')

// serve static pages
app.use('/',express.static('public'));
app.use('/subdir',express.static('public'));

// handle events logs
app.use(logger)
// Allow a program to process request body (usually sent by post or put )
app.use(express.urlencoded({extended: true}))

// allow a program to process json datas
app.use(express.json())

// handle Cross orign resourse sharing
// cors -> at specifit route example app.use('/', cors())
// cors -> at specifit orign example app.use(cors('http://www.google.com'))
app.use(cors(corsOptions));

// routes handler
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/employees'));

app.all('*', (req, res) => {
    req.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`The server running in the port ${PORT}`));