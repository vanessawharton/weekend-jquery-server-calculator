$(document).ready(readyNow);

//global variables
let calc = {};
let operator;
let numberString = "";

function readyNow() {
    console.log("jquery is loaded!");

    // click listeners
    $('.numBtn').on('click', numClicked);
    $('.math').on('click', grabSign);
    $('#submit-btn').on('click', submitCalc);
    $('#clear-btn').on('click', clearAll);
    $('#delete-btn').on('click', deleteLog);
    $('#calcHistory').on('click', '.prevCalc', runAgain);
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

    calc.numOne = numberString;
    calc.operator = operator;
    numberString += operator;
    $('#numberDisplay').val(numberString);
} // end grabSign

// capturing submitted equation within an object to send to server
function submitCalc() {
    console.log('Submitting equation for calculation on the server');

    // find second number using index of numberString and add to calc object
    let sum = numberString.indexOf(calc.operator);
    let secondNumber = numberString.substring(sum + 1);
    calc.numTwo = secondNumber;
    console.log('secondNumber is:', secondNumber);

    $.ajax({
        method: 'POST',
        url: '/answer',
        data: calc
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
        number: answer
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
        response.forEach(calc => {equation})

        $('#calc-log').append(`
            <li class="prevCalc">${equation}</li>
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

// deleting calc history
function deleteLog() {
    $('#calc-log').empty();
} // end deleteLog