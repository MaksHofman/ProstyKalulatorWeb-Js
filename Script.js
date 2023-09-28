const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const history = document.getElementById('history')
const clearButton = document.getElementById('clear');
const pi = document.getElementById("pi")
const dot = document.getElementById('dot')


let currentInput = '';
let operator = '';
let previousInput = '';
let historyString = '';
let result ='';
let dotIndicator = false;
let howManyAfterDot = '';
const piTrueNumeber = '3.14159265359'

/*
naprawa ui zeby ladnie wygladalo
wymysl co jeszcze dodac
napraw float(zaokraglanie)
*/


function updateDisplay() {
    let currentInputDisplay = '';
    if (previousInput && operator && currentInput) {
        currentInputDisplay = previousInput.toString() + " " + operator.toString() + " " + currentInput.toString()
    }
    else if (previousInput && operator) {
        currentInputDisplay = updatedDisplayWhileCalkulkting(previousInput, operator)
    }
    else if (currentInput){
        currentInputDisplay = currentInput
    }
    else if (previousInput) {
        currentInputDisplay = previousInput
    }
    else {
        currentInputDisplay = '0'
    }
    let historyStr = historyString;
    display.value = currentInputDisplay; 
    history.value = historyStr;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(dotIndicator == true) {
            let flaotbutton = parseFloat(button.textContent)
            let floatcurrent = parseFloat(currentInput)
            floatcurrent += (flaotbutton / 10 ** howManyAfterDot)
            currentInput = floatcurrent.toString()
            howManyAfterDot++; 
        } else {
            currentInput += button.textContent;
        }
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        operator = button.textContent;
        previousInput = currentInput;
        currentInput = '';
        clearDot();
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    if (previousInput && currentInput) {
        result = performCalculation(previousInput, currentInput, operator);
        historyMaker(previousInput, operator, currentInput, result)
        currentInput = result;
        previousInput = '';
        operator = '';
        clearDot();
        updateDisplay();
    }
});

clearButton.addEventListener('click', () => {
    currentInput = '';
    operator = '';
    previousInput = '';
    clearDot()
    updateDisplay();
});

dot.addEventListener('click', () => {
    dotIndicator = true
    howManyAfterDot = 1;
    updateDisplay();
})

pi.addEventListener('click', () => {
    currentInput += piTrueNumeber
    clearDot()
    updateDisplay()
})

function performCalculation(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;

        case 'X':
            if (num1 == 0 || num2 == 0){
                return 0;
            } else{
                return num1 * num2;
            }
        case '➗':
            if (num2 == 0) {
                return "Error debil przed kalkulatorem"
            }
            return num1 / num2;
   
        default:
            return 'Error';
    }
}

function updatedDisplayWhileCalkulkting (num1, operator) {
    let fortnite = num1.toString()  + " " + operator.toString()
    return fortnite;
}
function historyMaker (num1, operator, num2, result) {
    let his = num1.toString() + ' ' + operator.toString() + ' ' + num2.toString()  + ' = ' + result.toString()  
    historyString =  his;
}
function clearDot (){
    dotIndicator = false;
    howManyAfterDot = 0;
}


updateDisplay();
