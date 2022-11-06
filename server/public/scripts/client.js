$(document).ready(readyNow);

//global variables
let operator;

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

// capturing submitted equation within an object to send to server
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
        $('.errorMsg').append(`<h4>ERROR</h4>`);
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

// Keep a historical record of all math operations and solutions on the server. 
// Display a list of all previous calculations on the page when it loads using a GET request. 
// Update the list when a new calculation is made.
// > NOTE: History should exist even after refreshing the page. It's expected that the history 
// will go away after restarting the server. 
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