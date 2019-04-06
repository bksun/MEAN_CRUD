const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose }  = require('./db.js');
var employeeController = require('./controller/employeeController');
var GamesController    = require('./controller/GamesController');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(3100, () => console.log('Server started at port 3100') );

// app.get('/api/games', (req, res) => {
//     db.collection('Crud-React').find({}).toArray((err, games) => {
//         console.log('fetched games data');
//         res.json({games});
//     })
// })

app.use('/api/games', GamesController);
app.use('/employees', employeeController);
