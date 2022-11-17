// creating switch function for easier math
module.exports = function({calc}) {
    console.log('in /answer calc is:', calc);
    let numOne = Number(calc.firstNumber);
    let numTwo = Number(calc.secondNumber);

    switch(calc.operator) {
        case '+':
            return numOne + numTwo;
            break;
        case '-':
            return numOne - numTwo;
            break;
        case '*':
            return numOne * numTwo;
            break;
        case '/':
            return numOne / numTwo;
            break;
        default:
            console.log('Uh oh! Not able to calculate');
            break;
    }
}