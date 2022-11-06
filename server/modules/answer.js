// creating switch function for easier math
module.exports = function(object) {
    let numOne = Number(object.firstNumber);
    let numTwo= Number(object.secondNumber);

    switch(object.operator) {
        case '+':
            return (numOne + numTwo);
            break;
        case '-':
            return (numOne - numTwo);
            break;
        case '*':
            return (numOne * numTwo);
            break;
        case '/':
            return (numOne / numTwo);
            break;
        default:
            console.log('Uh oh! Not able to calculate');
            break;
    }
}