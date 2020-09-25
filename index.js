const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.listen(8090, function(){
    console.log("app working on port 8090");
});

app.get('/', (req, res) => {
    // res.send('App cd\'s');
    res.render('template.ejs');
});

app.post('/show', (req, res) => {
    console.log('Test');
});