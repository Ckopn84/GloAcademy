'use strict';

/*

    Задания по уроку №5

*/

const isNumber = (n) => {
    console.log('n: ', n);
    console.log(parseFloat(n));
    console.log(isFinite(n));
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        'интернет, такси, коммуналка'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 12;

// 1) Переписать функцию start циклом do while
do {
    money = prompt('Ваш месячный доход?');
} while (!isNumber(money));

let expenses = [];
// 2) Добавить проверку что введённые данные являются числом, которые мы получаем 
// на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth
const getExpensesMonth = () => {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        sum += (() => {
            let n = 0;
            do {
                n = prompt('Во сколько это обойдется?');
            } while (!isNumber(n));
            return +n;
        })();
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = (moneyMonth, expensesMonth) => {
    if (!moneyMonth) {
        moneyMonth = 0;
    }
    return moneyMonth - expensesMonth;
};

const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

const getTargetMonth = (myMiss, budgetMonth) => {
    return Math.ceil(myMiss / budgetMonth);
};

const targetMonth = getTargetMonth(mission, accumulatedMonth);

const budgetDay = accumulatedMonth / 30;

const showTypeOf = (data) => {
    console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLocaleLowerCase().split(', '));
console.log('Обязательные расходы за месяц: ', expensesAmount);

// 3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” 
// необходимо выводить “Цель не будет достигнута”
(targetMonth >= 0) ?
    console.log(`Цель будет достигнута за: ${targetMonth} месяцев`) :
    console.log(`Цель не будет достигнута`);

    console.log('Бюджет на день: ', Math.floor(budgetDay));

const getStatusIncome = (budget) => {
    return isNaN(budget) ? 'Упс! Где-то закралась ошибка...' :
        (budget < 0) ? 'Что то пошло не так' :
        (budget < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
        (budget === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
        (budget < 1200) ? 'У вас средний уровень дохода' :
        (budget === 1200) ? 'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
        'У вас высокий уровень дохода';
};
console.log('getStatusIncome(): ', getStatusIncome(budgetDay));