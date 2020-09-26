require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.API_USERNAME}:${process.env.API_KEY}@cluster0.lfwrb.mongodb.net/${process.env.API_APPNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {  useNewUrlParser: true });

client.connect(err => {
    const collection = client.db("test").collection("devices");
    client.close();
});

app.use(bodyParser.urlencoded({ extended: true }));
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
    console.log(req.body);
});