require('dotenv').config();

// const for server run
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// route connections to modules
const answer = require('./modules/answer.js');
const history = require('./modules/history.js');

// adding body parser
app.use(bodyParser.urlencoded({extended:true}));

// static files
app.use(express.static('server/public'));

// GET requests
app.get('/answer', (req, res) => {
  console.log('Request for /answer');

  res.send(history[history.length-1]);
})

app.get('/history', (req, res) => {
  console.log('Request for /history made');

  res.send(history);
})

// POST requests
app.post('/answer', (req, res) => {
  console.log('Posting request /answer', req.body);

  let eqInfo = req.body;
  eqInfo.answer = answer(eqInfo);
  history.push(eqInfo);
  console.log('in server post req, eqInfo is:', eqInfo);
  res.sendStatus(200);
})

// DELETE requests
app.delete('/history', (req, res) => {
  console.log('In req, Request to delete /history made');
  calcLog = [];
  res.sendStatus(200);
})

// PORT listening
app.listen(PORT, () => {
  console.log ('Server is running on port:', PORT);
})
