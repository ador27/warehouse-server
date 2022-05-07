const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vh8hi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const collection = client.db("affinity").collection("warhouse");

        app.get('/add', async (req, res) => {
            const query = {};
            const cursor = collection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })

        app.post('/add', async (req, res) => {
            const newItem = req.body;
            console.log('adding new item', newItem);
            const result = await collection.insertOne(newItem);
            res.send(result)

        });

        app.delete('/add/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await collection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running affinity server');
})


app.listen(port, () => {
    console.log('Listening to port', port);
})