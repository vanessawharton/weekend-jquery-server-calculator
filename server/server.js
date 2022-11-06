// const for server run
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// route connections to modules
let calcLog = require('./modules/calcLog.js');
let equationAnswer = require('./modules/equationAnswer.js');

// adding body parser
app.use(bodyParser.urlencoded({extended:true}));

// static files
app.use(express.static('server/public'));

// GET requests
app.get('/equation', (req, res) => {
  console.log('Request for /equation made');

  res.send(equation);
})

app.get('/answer', (req, res) => {
  console.log('Request for /answer made');

  res.send(equationAnswer);
})

// POST requests
app.post('/equation', (req, res) => {
  console.log('Posting request /equation', req.body);

  let equation = req.body;
  calcList.push(equation);

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
