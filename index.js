require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.API_USERNAME}:${process.env.API_KEY}@cluster0.lfwrb.mongodb.net/${process.env.API_APPNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));

client.connect(err => {
    const collection = client.db("cd_app").collection("cds");

    app.listen(8090, function(){
        console.log("app working on port 8090");
    });

    app.get('/', (req, res) => {
        const cursor = collection.find();
    })

    app.post('/show', (req, res) => {
        collection.insertOne(req.body, (err, result) => {
            if(err) return console.log("Error:" + err);
    
            console.log("Recorded successfully, saved to BD!");
            res.redirect('/show');
            collection.find().toArray((err, results) => {
                console.log(results);
            });
        });
    });

    app.get('/show', (req, res) => {
        collection.find().toArray((err, results) => {
            if(err) return console.log("Error: " + err);
            res.render('show.ejs', {cds: results});
        });
    });
    // client.close();
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.send('App cd\'s');
    res.render('template.ejs');
});

// app.post('/show', (req, res) => {
//     collection.insertOne(req.body, (err, result) => {
//         if(err) return console.log("Error:" + err);

//         console.log("Recorded successfully, saved to BD!");
//         res.redirect('/');
//     });
// });