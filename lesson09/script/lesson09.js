/*

    Урок 9

*/

/*
Задание по проекту, получить каждый элемент в отдельную переменную:
- Кнопку "Рассчитать" через id
- Кнопки “+” (плюс) через Tag, каждую в своей переменной. 
- Чекбокс по id через querySelector
- Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
- Каждый элемент в правой части программы через класс, которые имеют в имени класса "-value", 
начиная с class="budget_day-value" и заканчивая class="target_month-value">
- Оставшиеся поля через querySelector каждый в отдельную переменную:
- поля ввода (input) с левой стороны и не забудьте про range.
*/

const buttonStart = document.getElementById('start');
console.log('buttonStart: ', buttonStart);

const incomeAdd = document.getElementsByTagName('button')[0];
console.log('incomeAdd: ', incomeAdd);

const expensesAdd = document.getElementsByTagName('button')[1];
console.log('expensesAdd: ', expensesAdd);

const depositCheck = document.querySelector('#deposit-check');
console.log('checkBox: ', depositCheck);

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log('additionalIncomeItem: ', additionalIncomeItem);

// const resultTotalValue = document.querySelectorAll('.result-total');
// console.log('resultTotalValue: ', resultTotalValue);
const budgetMonthValue = document.querySelector('.budget_month-value');
console.log('budgetMonthValue: ', budgetMonthValue);
const budgetDayValue = document.querySelector('.budget_day-value');
console.log('budgetDayValue: ', budgetDayValue);
const expensesMonthValue = document.querySelector('.expenses_month-value');
console.log('expensesMonthValue: ', expensesMonthValue);
const additionalIncomeValue = document.querySelector('.additional_income-value');
console.log('additionalIncomeValue: ', additionalIncomeValue);
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
console.log('additionalExpensesValue: ', additionalExpensesValue);
const incomePeriodValue = document.querySelector('.income_period-value');
console.log('incomePeriodValue: ', incomePeriodValue);
const targetMonthValue = document.querySelector('.target_month-value');
console.log('targetMonthValue: ', targetMonthValue);

const periodSelect = document.querySelector('.period-select'); // range
console.log('periodSelect: ', periodSelect);

// inputs
const salaryAmount = document.querySelector('.salary-amount');
console.log('salaryAmount: ', salaryAmount);
const incomeItems = document.querySelector('.income-items');
// console.log('incomeItems: ', incomeItems);
console.log('incomeTitle: ', incomeItems.children[0]);
console.log('incomeAmount: ', incomeItems.children[1]);
// const incomeAmount = document.querySelector('.income-amount');
// console.log('incomeAmount: ', incomeAmount);
const expensesItems = document.querySelector('.expenses-items');
console.log('expensesTitle: ', expensesItems.children[0]);
console.log('expensesAmount: ', expensesItems.children[1]);
// const expensesAmount = document.querySelector('.expenses-amount');
// console.log('expensesAmount: ', expensesAmount);
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log('additionalExpensesItem: ', additionalExpensesItem);
const depositAmount = document.querySelector('.deposit-amount');
console.log('depositAmount: ', depositAmount);
const depositPercent = document.querySelector('.deposit-percent');
console.log('depositPercent: ', depositPercent);
const targetAmount = document.querySelector('.target-amount');
console.log('targetAmount: ', targetAmount);
