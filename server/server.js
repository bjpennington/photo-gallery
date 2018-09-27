const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const gallery = require('./routes/gallery.router.js');
const port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

const databaseUrl = `mongodb://localhost:27017/gallery`;
mongoose.connect(databaseUrl);

mongoose.connection.on('connected', () => {
    console.log('mongoose connected on', databaseUrl);
    
});
mongoose.connection.error('error', (error) => {
    console.log('mongoose connection error:', error);
    
})

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/gallery', gallery);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});