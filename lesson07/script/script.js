'use strict';

/*

    Задания по уроку №7

1) Функцию showTypeof и вызов функции удаляем 
2) В объект appData добавить свойство budget которое будет принимать значение money
3) В объект appData добавить свойства budgetDay, budgetMonth и expensesMonth, изначально равные нулю
4) Функции getExpensesMonth, getAccumulatedMonth, getTargetMonth, getStatusIncome - сделать 
методами объекта AppData
5) После этого поправить весь проект, чтобы он работал, а именно
Везде где вызывались наши функции поправить обращение через объект, например
let expensesMonth = appData.getExpensesMonth();
*/

/*
6) Сразу после объекта выполните вызов appData.asking();
7) Перенести цикл из метода getExpensesMonth в метод asking, и переписать цикл таким образом 
чтобы результат записывался в объект  appData.expenses
в формате:
expenses: {
    “ответ на первый вопрос” : “ответ на второй вопрос”,
    “ответ на первый вопрос” : “ответ на второй вопрос”
}
временные условия которые мы писали
if (i === 0) {
    expenses1 = prompt('Введите обязательную статью расходов?', 'Кварплата');
} else {
    expenses2 = prompt('Введите обязательную статью расходов?', 'Бензин');
}
уже не нужны, вопрос задается каждый цикл
Обратите внимание Если на вопрос "Введите обязательную статью расходов?" ответить 2 раза одинаково, 
значения свойства просто будут перезаписаны, для проверки отвечайте всегда по разному. (очень частая ошибка)
Проследите чтобы тип данных значения свойств были числом!
Пример результата:
expenses: {
    “Квартплата” : 5000,
    “Детский сад” : 2000
}
8) Переписать метод getExpensesMonth: с помощью цикла считаем сумму всех обязательных 
расходов и сохраняем результат в свойство expensesMonth нашего объекта
для того, чтобы посчитать сумму используйте цикл for in
9) getAccumulatedMonth переименовать в getBudget. Этот метод будет высчитывать значения 
свойств budgetMonth и budgetDay, чтобы вычислить значения используем только свойства 
объекта (никаких внешних переменных)
10) В методах getTargetMonth и getStatusIncome исправить переменные, все значения получаем 
от нашего объекта appData
11) Вызвать все необходимые методы после объекта, чтобы корректно считались все данные 
(порядок очень важен).
12) В консоль вывести: 
    — Расходы за месяц
    — За какой период будет достигнута цель (в месяцах)
    — Уровень дохода
Все остальное почистить в программе у нас всего две переменных money и appData
И две функции start и возможно isNumber
13) Используя цикл for in для объекта (appData), вывести в консоль сообщение "Наша программа 
включает в себя данные: " (вывести все свойства и значения)
*/
const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = () => {
        do {
            money = prompt('Ваш месячный доход?', 60000);
        } while (!isNumber(money));
    };

start();

let appData = {
    income: {}, // Статья доп дохода
    addIncome: [],
    expenses: {}, // список обязательных статей расходов
    addExpenses: [], // строка с перечислением дополнительных расходов
    deposit: false, // надичие депозита в банке
    mission: 50000, // желаемая цель (Какую сумму хотите накопить)
    period: 3,
    budget: +money, // Доход за месяц
    budgetDay: 0, // Дневной бюджет (доход за месяц / 30)
    budgetMonth: 0,
    expensesMonth: 0,
    asking: () => {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'интернет, такси, коммуналка');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            appData.expenses[prompt('Введите обязательную статью расходов?')] = (() => {
                let n = 0;
                do {
                    n = prompt('Во сколько это обойдется?');
                } while (!isNumber(n));
                return +n;
            })();
            // console.log(appData.expenses);
        }
    },
    getExpensesMonth: () => { // Функция возвращает сумму всех обязательных расходов за месяц
        appData.expensesMonth = 0;
        for (let elem in appData.expenses) {
            appData.expensesMonth += appData.expenses[elem];
        }
    },
    getBudget: () => { // Функция возвращает Накопления за месяц (Доходы минус расходы)
        if (!appData.budget) {
            appData.budget = 0;
        }
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: () => { // Подсчитывает за какой период будет достигнута цель
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: () => { // Статус дохода (низкий / средний / высокий)
        return isNaN(appData.budget) ? 'Упс! Где-то закралась ошибка...' :
            (appData.budget < 0) ? 'Что то пошло не так...' :
            (appData.budget < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (appData.budget === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
            (appData.budget < 1200) ? 'У вас средний уровень дохода' :
            (appData.budget === 1200) ?
            'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
            'У вас высокий уровень дохода';
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

const targetMonth = appData.getTargetMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(targetMonth >= 0 ?
    `Цель будет достигнута за: ${targetMonth} месяц(а/ев)` :
    'Цель не будет достигнута');
console.log('Уровень дохода: ', appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
}
