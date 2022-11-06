// const for server run
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// route connections to modules
let calcLog = require('./modules/calcLog.js');
let calcAnswer = require('./modules/answer.js');
let log = [];

// adding body parser
app.use(bodyParser.urlencoded({extended:true}));

// static files
app.use(express.static('server/public'));

// GET requests
app.get('/equations', (req, res) => {
  console.log('Request for /equations made to send to CalcLog');

  res.send(calcLog);
})

app.get('/calcAnswer', (req, res) => {
  console.log('Request for /answer made');

  res.send(calcAnswer);
})

// POST requests
app.post('/equations', (req, res) => {
  console.log('Posting request /equations', req.body);

  let equation = req.body;
  calcLog.push(equation);

  res.sendStatus(200);
})

app.post('/answer', (req, res) => {
  console.log('Posting request /answer', req.body);

    let calcAnswer = req.body;

  res.sendStatus(200);
})

// DELETE requests
app.delete('/answer', (req, res) => {
  console.log('Request to delete /answer made');
  res.sendStatus(200);
})


// PORT listening
app.listen(PORT, () => {
  console.log ('Server is running on port:', PORT);
})
