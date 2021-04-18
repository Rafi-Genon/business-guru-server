const express = require('express')
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || 5050

const app = express()
app.use(cors())
app.use(bodyParser.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y23oh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const serviceCollection = client.db("businessGuru").collection("serviceList");
    const reviewsCollection = client.db("businessGuru").collection("review");
    const ordersCollection = client.db("businessGuru").collection("orders");
    const adminsCollection = client.db("businessGuru").collection("admins");

    app.post('/addService', (req, res) => {
        const newServiceData = (req.body)
        serviceCollection.insertOne(newServiceData)
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/services', (req, res) => {
        serviceCollection.find()
            .toArray((err, services) => {
                res.send(services)
            })
    })

    app.post('/addReview', (req, res) => {
        const newReviewData = (req.body)
        reviewsCollection.insertOne(newReviewData)
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/review', (req, res) => {
        reviewsCollection.find()
            .toArray((err, reviews) => {
                res.send(reviews)
            })
    })

    app.post('/addOrder', (req, res) => {
        const newOrderData = (req.body)
        ordersCollection.insertOne(newOrderData)
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/allOrders', (req, res) => {
        ordersCollection.find()
            .toArray((err, orders) => {
                res.send(orders)
            })
    })

    app.patch('/update/:id', (req, res) => {
        console.log(req.body, req.params);
        const id = req.params.id
        ordersCollection.updateOne({ _id: ObjectID(id) },
            {
                $set: { status: req.body.status }
            })
            .then(result => {
                console.log(result),
                    res.send(modifiedCount > 0)
            })

    })

    app.get('/showBookings', (req, res) => {
        const userEmail = req.query.email
        ordersCollection.find({ email: userEmail })
            .toArray((err, orderedService) => {
                res.send(orderedService)
            })
    })

    app.post('/addAdmin', (req, res) => {
        const addNewAdmin = (req.body)
        adminsCollection.insertOne(addNewAdmin)
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0)
            })
    })

    app.post('/isAdmin', (req, res) => {
        const userEmail = req.body.email
        adminsCollection.find({ email: userEmail })
            .toArray((err, admin) => {
                res.send(admin.length > 0)
            })
    })

    app.delete('/remove/:id', (req, res) => {
        const id = req.params.id
        serviceCollection.deleteOne({ _id: ObjectID(id) })
            .then(documents => res.send(!!documents.value))
    })
});
app.get('/', (req, res) => {
    res.send('workiniing')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
