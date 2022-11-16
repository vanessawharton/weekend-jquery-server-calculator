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

    calc.firstNumber = numberString;
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
        data: {calc}
    }).then(function(response) {
        console.log('Posting math', response);
        getAnswer();
        getHistory();
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
function getAnswer() {
    console.log('Getting the calculations');

    $.ajax({
        method: 'GET',
        url: '/answer'
    }).then(function(response) {
        console.log('Going to render answer to DOM:', response);
        $('#answerEquals').empty();
        $('#answerEquals').append(`${calc.answer}`);
        clearAll();
    }).catch(function(error) {
        alert('Error!', error);
    })
} // end getAnswer

// render to DOM
// function renderToDom (answer) {
//     console.log('Rendering answer to DOM:', answer);
//     $('#answerEquals').empty();

    // $.ajax({
    // method: 'GET',
    // url: '/answer',
    // }).then(function(response) {
    // }).catch(function(error) {
    // alert('Error!', error);
    // })

    // $('#answerEquals').append(`${calc.answer}`);

    // clearAll();
// } // end renderToDom

function getHistory() {
    console.log('Loading prior calculation history');

    // emptying the log to append with new calc
    $('#calc-log').empty();

    $.ajax({
        type: 'GET',
        url: '/history'
    }).then(function(response) {
        response.forEach(calc => {
            let sum = calc.answer;
            let numOne = calc.firstNumber;
            let numTwo = calc.secondNumber;
            let oper = calc.operator;
            
            $('#calc-log').append(`
                <li class="prevCalc" data-numberOne="${numOne}" data-numberTwo="${numTwo}" data-operator="${oper}">
                    ${numOne} ${oper} ${numTwo} = ${sum}
                </li>
            `);
        })
    }).catch(function(error) {
        alert('Error!', error);
    })
} // end getHistory

// returns previous calculation from the log
function runAgain() {
    equation = $(this).data();
    submitCalc();
} // end runAgain

// deleting calc history
function deleteLog() {
    console.log('Request to delete /calcLog');

    $.ajax({
        url: '/history',
        type: 'DELETE',
        success: (function (response) {
            $('#calc-log').empty();
        }).catch(function(error){
            alert('Error!');
        })
    })
} // end deleteLog