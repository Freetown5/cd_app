require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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

    app.route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id;
        collection.find(ObjectId(id)).toArray((err, result) => {
            if(err) return console.log("Error: " + err);
            res.render('edit.ejs', {cds: result});
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        const title = req.body.title;
        const artist = req.body.artist;
        const genre = req.body.genre;
        collection.updateOne({_id: ObjectId(id)}, {
            $set: {
                title: title,
                artist: artist,
                genre: genre
            }
        }, (err, result) => {
            if(err) return res.send(err);
            res.redirect('/show');
            console.log("Successfully Updated!");
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