const express = require('express');
const cors = require('cors')
const { createServer } = require('http')

const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');
const httpServer = createServer(app) // createServer expects a "requestlister" which express is

// setting up cors
const whitelist = ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) != -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error("origin is not allowed"), false);
        }
    }
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.post('/', (req, res) => {
    data = req.body;
    res.send({data: data.data});
});

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
});