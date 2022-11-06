// const for server run
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// route connections to modules
let answer = require('./modules/answer.js');
let calcLog = [];

// adding body parser
app.use(bodyParser.urlencoded({extended:true}));

// static files
app.use(express.static('server/public'));

// GET requests
app.get('/answer', (req, res) => {
  console.log('Request for /answer');

  res.send(calcLog[calcLog.length-1]);
})

app.get('/calcLog', (req, res) => {
  console.log('Request for /calcLog made');

  res.send(calcLog);
})

// POST requests
app.post('/answer', (req, res) => {
  console.log('Posting request /answer', req.body);

  let equation = req.body;
  equation.answer = answer(equation);
  calcLog.push(equation);

  res.sendStatus(200);
})

// DELETE requests
app.delete('/calcLog', (req, res) => {
  console.log('Request to delete /calcLog made');
  calcLog = [],
  res.sendStatus(200);
})

// PORT listening
app.listen(PORT, () => {
  console.log ('Server is running on port:', PORT);
})
