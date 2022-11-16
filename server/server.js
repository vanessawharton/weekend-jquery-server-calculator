// const for server run
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// route connections to modules
const getAnswer = require('./modules/getTheResult.js');
let calcLog = [];
let answer = [];

// adding body parser
app.use(bodyParser.urlencoded({extended:true}));

// static files
app.use(express.static('server/public'));

// GET requests
app.get('/answer', (req, res) => {
  console.log('Request for /answer');

  res.send(answer);
})

app.get('/history', (req, res) => {
  console.log('Request for /history made');

  res.send(calcLog);
})

// POST requests
app.post('/answer', (req, res) => {
  console.log('Posting request /answer', req.body);

  let eqInfo = req.body.answer;
  console.log('req.body.answer is:', req.body.answer);
  calcLog.push(eqInfo);

  res.sendStatus(200);
})

// DELETE requests
app.delete('/history', (req, res) => {
  console.log('Request to delete /history made');
  calcLog = [],
  res.sendStatus(200);
})

// PORT listening
app.listen(PORT, () => {
  console.log ('Server is running on port:', PORT);
})
