import { writable } from 'svelte/store';
export const keys = {
    zero: {
        display: '0',
        class: 'row-5',
        function: () => handleNextCalc(handleZero),
    },
    one: {
        display: '1',
        class: 'col-1 row-4',
        function: () => handleNextCalc(() => handleOneToNine('1')),
    },
    two: {
        display: '2',
        class: 'col-2 row-4',
        function: () => handleNextCalc(() => handleOneToNine('2')),
    },
    three: {
        display: '3',
        class: 'col-3 row-4',
        function: () => handleNextCalc(() => handleOneToNine('3')),
    },
    four: {
        display: '4',
        class: 'col-1 row-3',
        function: () => handleNextCalc(() => handleOneToNine('4')),
    },
    five: {
        display: '5',
        class: 'col-2 row-3',
        function: () => handleNextCalc(() => handleOneToNine('5')),
    },
    six: {
        display: '6',
        class: 'col-3 row-3',
        function: () => handleNextCalc(() => handleOneToNine('6')),
    },
    seven: {
        display: '7',
        class: 'col-1 row-2',
        function: () => handleNextCalc(() => handleOneToNine('7')),
    },
    eight: {
        display: '8',
        class: 'col-2 row-2',
        function: () => handleNextCalc(() => handleOneToNine('8')),
    },
    nine: {
        display: '9',
        class: 'col-3 row-2',
        function: () => handleNextCalc(() => handleOneToNine('9')),
    },
    decimal: {
        display: '.',
        class: 'col-3 row-5',
        function: () => handleNextCalc(handleDecimal),
    },
    equals: {
        display: '=',
        class: 'col-4 secondary',
        function: handleEquals,
    },
    add: {
        display: '+',
        class: 'col-4 secondary',
        function: () => handleNextCalc(handleAdd),
    },
    subtract: {
        display: '-',
        class: 'col-4 row-1 secondary',
        function: () => handleNextCalc(handleSubtract),
    },
    multiply: {
        display: '×',
        class: 'col-3 row-1 secondary',
        function: () => handleNextCalc(handleMultiply),
    },
    divide: {
        display: '÷',
        class: 'col-2 row-1 secondary',
        function: () => handleNextCalc(handleDivide),
    },
    clear: {
        display: 'AC',
        class: 'col-1 row-1 secondary',
        function: handleClear,
    },
};

export const newNum = writable('0');
export const expression = writable('0');
let newNumValue;
let expressionValue;
newNum.subscribe(value => newNumValue = value);
expression.subscribe(value => expressionValue = value);
let nextNum = false;
let result;
let nextCalc = false;

function handleOneToNine(num) {
    const startsWithZero = /^0/;
    if (nextCalc) expression.set('');
    if (startsWithZero.test(newNumValue) && !isDecimal.test(newNumValue)) {
        newNum.set(num);
        expression.update(e => e.slice(0, -1) + num);
    } else {
        if (nextNum) {
            newNum.set('');
            nextNum = false;
        };
        newNum.update(n => n + num);
        expression.update(e => e + num);
    };
}

const isDecimal = /\d*(?=\.)/;

function handleZero() {
    const startsWithZero = /^0/;
    if (nextCalc) expression.set('');
    if (startsWithZero.test(newNumValue) && !isDecimal.test(newNumValue)) return;
    else {
        if (nextNum) {
            newNum.set('');
            nextNum = false;
        };
        newNum.update(n => n + '0');
        expression.update(e => e + '0');
    };
}
function handleDecimal() {
    if (nextNum) {
        newNum.set('');
        nextNum = false;
        newNum.update(n => n + '.');
        expression.update(e => e + '.');
    } else if (isDecimal.test(newNumValue)) return;
    else {
        newNum.update(n => n + '.');
        expression.update(e => e + '.');
    };
}

const endsWithOperator = /[\+\-×÷]$/;
const negatedOperation = /([\+\-×÷][-])$/;

function handleAdd() {
    if (negatedOperation.test(expressionValue)) expression.update(e => e.slice(0, -2) + '+');
    else if (endsWithOperator.test(expressionValue)) expression.update(e => e.slice(0, -1) + '+');
    else expression.update(e => e + '+');
    nextNum = true;
}
function handleSubtract() {
    if (negatedOperation.test(expressionValue)) return;
    else expression.update(e => e + '-');
    nextNum = true;
}
function handleMultiply() {
    if (negatedOperation.test(expressionValue)) expression.update(e => e.slice(0, -2) + '×');
    else if (endsWithOperator.test(expressionValue)) expression.update(e => e.slice(0, -1) + '×');
    else expression.update(e => e + '×');
    nextNum = true;
}
function handleDivide() {
    if (negatedOperation.test(expressionValue)) expression.update(e => e.slice(0, -2) + '÷');
    else if (endsWithOperator.test(expressionValue)) expression.update(e => e.slice(0, -1) + '÷');
    else expression.update(e => e + '÷');
    nextNum = true;
}
function handleClear() {
    newNum.set('0');
    expression.set('0');
    nextNum = false;
    nextCalc = false;
}
function handleNextCalc(callback) {
    if (nextCalc) {
        expression.set(result);
        newNum.set('');
        callback();
        nextCalc = false;
    } else callback();
}
function handleEquals() {
    if (expressionValue == 0 || nextCalc) return;
    const cleanedExpression =
        expressionValue
            .replace('×', '*')
            .replace('÷', '/')
            .replace(/(--)/g, '+')
            .replace(endsWithOperator, '')
            .replace(endsWithOperator, '');
    console.log(cleanedExpression);
    result = eval(cleanedExpression);
    console.log(result);
    newNum.set(result);
    expression.set(expressionValue.replace(endsWithOperator, '').replace(endsWithOperator, '') + '=' + result);
    nextNum = true;
    nextCalc = true;
}