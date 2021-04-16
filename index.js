const express = require('express')
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = 5050

const app = express()
app.use(cors())
app.use(bodyParser.json())

// businessGuru
// serviceList

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y23oh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const serviceCollection = client.db("businessGuru").collection("serviceList");

    app.post('/addService', (req, res) => {
        const newServiceData = (req.body)
        serviceCollection.insertOne(newServiceData)
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0)
            })
        // const newService = req
    })

    app.get('/services', (req, res) => {
        serviceCollection.find()
            .toArray((err, services) => {
                res.send(services)
            })
    })
});
// app.get('/', (req, res) => {
//     res.send('workiniing')
//     console.log('it is /');
// })

app.listen(port, () => {
    console.log(`Example appa listening at http://localhost:${port}`)
})
