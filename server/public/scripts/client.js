
// ### Calculator
// Create a user interface where the user can input two values (2 input elements) and the 
// select type of mathematical operation. When the submit (`=` button) is clicked, capture this input, 
// bundle it up in an object, and send this object to the server via a POST. There should also be 
// a 'C' button that will clear the user input fields.
// Build out the server-side logic to compute the numbers as appropriate. The server should be able 
// to handle Addition, Subtraction, Multiplication, and Division. Once the calculation is complete, 
//send back the OK. You should do a GET request after the POST to get the actual calculation.

// ### History
// Keep a historical record of all math operations and solutions on the server. 
// Display a list of all previous calculations on the page when it loads using a GET request. 
// Update the list when a new calculation is made.
// > NOTE: History should exist even after refreshing the page. It's expected that the history 
// will go away after restarting the server. 
// > Note: Do not use eval() to complete this assignment.

$(document).ready(readyNow);

//global variables
let operator;

// NOTES
// $('firstNumber).val()
// $('secondNumber).val()
// $('.errorMsg').append(`<h4>Both players must make a guess.</h4>`);

// readyNow function
function readyNow() {
    console.log("jquery is loaded!");

    // click listeners
    $('.math').on('click', grabSign);
    $('#submit-btn').on('click', submitCalc);
    $('#clear-btn').on('click', clearAll);

    // history log of previous calculations entered
    calcHistory();
} // end readyNow


// clearing the error messages
function clearErr() {
    console.log('Clearing error messages');

    $('.errorMsg').empty();
} // end clearErr

// choosing operator
function grabSign() {
    $(this).text()= operator;
} // end grabSign

// submit equation for solving
function submitCalc() {
    console.log('Submitting equation');

    $.ajax({
        method: 'POST',
        url: '/answer',
        data: {
        numOne: $('firstNumber').val(),
        numTwo: $('secondNumber').val(),
        eqOperator: operator
        }
    }).then(function(response) {
        console.log('Posting math', response);
        getCalc();
    }).catch(function(error) {
        alert('Request failed', error);
    })
} // end submitCalc

// clear the user input fields
function clearAll() {
    console.log('Clearing inputs');

    $('#firstNumber').val('');
    $('#secondNumber').val('');

    clearErr();
} // end clearAll

// gets answer from the server
function getCalc() {
    console.log('Getting the calculations');

    $.ajax({
        method: 'GET',
        url: '/answer'
    }).then(function(response) {
        renderToDom(response);
    }).catch(function(error) {
        alert('Error!', error);
    })
} // end getCalc

// render to DOM
function renderToDom (answer) {
    $('#answerEquals').empty();

    $.ajax({
    method: 'POST',
    url: '/answer',
    data: {
        number: equationAnswer
    }
    }).then(function(response) {
    }).catch(function(error) {
    alert('Error!', error);
    })


    $('#calc-log').prepend(`
        <ul>
            <li>CALCULATION</li>
        </ul>
    `)
}

function calcHistory() {
    console.log('Loading prior calculations');

    // emptying the log to append with new calc
    $('#calc-log').empty();

    $.ajax({
        type: 'GET',
        url: '/calcLog'
    }).then(function (response) {
    
    })
}