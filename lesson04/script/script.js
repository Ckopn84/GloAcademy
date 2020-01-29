'use strict';

// Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
let money = +prompt('Ваш месячный доход?', 40000);

// Статья доп дохода
let income = 'фриланс';

// Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” 
//сохранить в переменную addExpenses
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'интернет, такси, коммуналка');

// Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit
//(булево значение true/false)
let deposit = confirm('Есть ли у вас депозит в банке?');

let mission = 100000; // число (Какую сумму хотите накопить)
// console.log('addExpenses: ', addExpenses.length);
let period = 12; // число от 1 до 12 (месяцев)
// console.log(`Период равен ${period} месяцев.
//     Цель заработать ${mission} рублей/долларов/гривен/юани`);

/* Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
    “Введите обязательную статью расходов?” (например expenses1, expenses2)
    “Во сколько это обойдется?” (например amount1, amount2)
в итоге 4 вопроса и 4 разные переменных */
let expenses1 = prompt('Введите обязательную статью расходов?', 'продукты');
let amount1 = +prompt('Во сколько это обойдется?', 20000);
let expenses2 = prompt('Введите обязательную статью расходов?', 'бензин, транспорт');
let amount2 = +prompt('Во сколько это обойдется?', 1500);

/*

    Задания по уроку №4

*/
// Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = () => {
    if (!amount1) { amount1 = 0; }
    if (!amount2) { amount2 = 0; }
    return amount1 + amount2;
};

// Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (moneyMonth, expensesMonth) => {
    if (!moneyMonth) { moneyMonth = 0; }
    return moneyMonth - expensesMonth;
};
// console.log('Накопления за месяц: ', getAccumulatedMonth(money, getExpensesMonth()));

// Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
// const accumulatedMonth = getAccumulatedMonth(money, expenses);
const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());

// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, зная 
// результат месячного накопления (accumulatedMonth) и возвращает результат
const getTargetMonth = (myMiss, budgetMonth) => {
    return Math.ceil(myMiss / budgetMonth);
};

// budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
const budgetDay = accumulatedMonth / 30;

const showTypeOf = (data) => {
    console.log(data, typeof (data));
};
// Почистить консоль логи и добавить недостающие, должны остаться:
//  - вызовы функции showTypeOf
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

//  - Расходы за месяц вызов getExpensesMonth
console.log('Обязательные расходы за месяц: ', getExpensesMonth());

//  - Вывод возможных расходов в виде массива (addExpenses)
console.log(addExpenses.toLocaleLowerCase().split(', '));

//  - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
console.log(`Цель будет достигнута за: ${getTargetMonth(mission, accumulatedMonth)} месяцев`);

//  - Бюджет на день
console.log('Бюджет на день: ', Math.floor(budgetDay));

//  - вызов функции getStatusIncome
const getStatusIncome = (budget) => {
    return isNaN(budget) ? 'Упс! Где-то закралась ошибка...' :
        (budget < 0) ? 'Что то пошло не так' :
        (budget < 600) ? 'Что то пошло не так' :
        (budget === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
        (budget < 1200) ? 'У вас средний уровень дохода' :
        (budget === 1200) ? 'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
        'У вас высокий уровень дохода';
};
console.log('getStatusIncome(): ', getStatusIncome(budgetDay));
