$(document).ready(readyNow);

//global variables
let equation = {};
let operator;
let numberString = "";

function readyNow() {
    console.log("jquery is loaded!");

    // click listeners
    $('.numBtn').on('click', numClicked);
    $('.math').on('click', grabSign);
    $('#submit-btn').on('click', submitCalc);
    $('#clear-btn').on('click', clearAll);

    // history log of previous calculations entered
//    calcHistory();
} // end readyNow

// clearing the error messages
function clearErr() {
    console.log('Clearing error messages');

    $('.errorMsg').empty();
} // end clearErr

// enter number clicked to string
function numClicked() {
    numberString += $(this).text();

    // show on DOM
    $('#numberDisplay').val(numberString);
} // end numClicked

// choosing operator
function grabSign() {
    operator = $(this).text();
    console.log('Operator is:', operator);

    equation.numOne = numberString;
    equation.operator = operator;
    numberString += operator;
    $('#numberDisplay').text(numberString);
} // end grabSign

// capturing submitted equation within an object to send to server
function submitCalc() {
    console.log('Submitting equation for calculation on the server');

    $.ajax({
        method: 'POST',
        url: '/answer',
        data: equation
    }).then(function(response) {
        console.log('Posting math', response);
        getCalc();
        calcHistory();
    }).catch(function(error) {
        $('.errorMsg').append(`<h4>ERROR</h4>`);
    })
} // end submitCalc

// clear the user input field
function clearAll() {
    console.log('Clearing inputs');

    $('#numberDisplay').val('');
    numberString = "";
    equation = {};

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
    console.log('Rendering answer to DOM:', answer);
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

    $('#answerEquals').append(`${answer}`);

    clearAll();
} // end renderToDom

function calcHistory() {
    console.log('Loading prior calculation history');

    // emptying the log to append with new calc
    $('#calc-log').empty();

    $.ajax({
        type: 'GET',
        url: '/calcLog'
    }).then(function(response) {
        response.forEach(calc => {equation}

        $('#calc-log').append(`
            <li>${equation}</li>
        `);
    }).catch(function(error) {
        alert('Error!', error);
    })
} // end calcHistory

// returns previous calculation from the log
function runAgain() {
    equation = $(this).data();
    submitCalc();
} // end runAgain