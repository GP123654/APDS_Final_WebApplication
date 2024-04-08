/*
 * Done By: Greg Postings ST10114245 
 * Module: APDS
 * Class: BCA3 G7
 * Task: POE Task 2
 * Start Date and Time: 20 September 2022 at 10:20
 * Finish Date and Time: 11 October 2022 at 12:35
 * 
 */


//----------------------------------------------------------------------------------//
//Imports / included items
require('dotenv').config();
const express = require('express');
const app = express();
const hsts = require('./middleware/hsts');
const cors = require('cors');
const helmet = require('helmet');
const https = require('https');
//const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose');


/*
var privateKey  = fs.readFileSync('keys/gregprivatekey.pem', 'utf8');
var certificate = fs.readFileSync('keys/gregcertificate.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(3000);*/




//----------------------------------------------------------------------------------//
//Database
mongoose
//Connecting to the databse using a connection string
.connect(process.env.MONGODB_URL)
//Message to let you know that you have connected
.then(() => console.log('Database connected... :)'));


//----------------------------------------------------------------------------------//
//Middleware
app.use(helmet());
app.use(cors({origin: '*', optionsSuccessStatus: 200}));
app.use(express.json());
app.use(hsts);


app.use((reg,res,next) =>
{
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader("Access-Control-Allow-Methods", '*');
    next();
});


//----------------------------------------------------------------------------------//
//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/bulletinBoardPosts', require('./routes/bulletinBoardPosts'));


//----------------------------------------------------------------------------------//
//Server


https
.createServer(
    {
        //Private key
        key:  fs.readFileSync('keys/gregprivatekey.pem'),
        //Certificate
        cert: fs.readFileSync('keys/gregcertificate.pem'),
        //Passphrase
        passphrase: 'apds',
    }, app)
    //Port to listen to
    .listen(3000);

//--------------------------ooo000 END OF FILE 000ooo---------------------------//



//------------------------------------------------------------------------------//
//ORIGINAL CODE
/*

const urlprefix = '/api'

//Certificate
const cert = fs.readFileSync('keys/gregcertificate.pem');

const options = {
    server: {sslCA: cert }
};

//Connection string for database
const connstring = 'mongodb+srv://Greg:Haker123@gregapdspoetaskcluster.lsht5kf.mongodb.net/?retryWrites=true&w=majority'

//Routes
const bulletinBoardPostsRoutes = require('./routes/bulletinboardposts');
const usersRoutes = require('./routes/users');


//Connection to mongoDB
mongoose.connect(connstring)
.then(() =>
{
    //If it connects
    console.log('Connected :-)')
})
.catch(() =>
{
    //If it does not connect
    console.log('NOT CONNECTED :-(')
}, options);

app.use(express.json())

//Allows frontend to call the backend without cross origin restriction
app.use((reg,res,next) =>
{
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader("Access-Control-Allow-Methods", '*');
    next();
});



app.get(urlprefix + '/', (req, res) => {
    res.send('Hello World');
})

app.use(urlprefix + '/bulletinboardposts', bulletinBoardPostsRoutes)
app.use(urlprefix + '/users', usersRoutes)

module.exports = app;

*/


//FOR THE SERVER
/*

const https = require('https');
const app = require('./app');
const fs = require('fs');

//Port
const PORT = 3000;

const server = https.createServer(
    {
        //Private key
        key:  fs.readFileSync('keys/gregprivatekey.pem'),
        //Certificate
        cert: fs.readFileSync('keys/gregcertificate.pem')
    }, app);

server.listen(PORT);*/