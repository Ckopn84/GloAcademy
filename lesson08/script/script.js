'use strict';

/*

    Задания по уроку №8

*/

/*
1) Сделать проверку при получении данных:
   - наименование дополнительного источника заработка
   - сумма дополнительного заработка
   - ввод статьи обязательных расходов
   - годовой процент депозита
   - сумма депозита
Что значит проверка данных: где должен быть текст там только текст, где цифры только цифры! 
Если проверку не прошло, то переспрашивать!
2) Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой буквы 
слова разделены запятой и пробелом
Пример (Интернет, Такси, Коммунальные расходы)
*/

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = (str, comma = false) => {
    const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
    return pattern.test(str);
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
    precentDeposit: 0, // под какой % вложено
    moneyDeposit: 0, // сколько вложено
    mission: 50000, // желаемая цель (Какую сумму хотите накопить)
    period: 3,
    budget: +money, // Доход за месяц
    budgetDay: 0, // Дневной бюджет (доход за месяц / 30)
    budgetMonth: 0,
    expensesMonth: 0,
    asking: () => {
        if (confirm('Есть ли у Вас дополнительный источник заработка?')){
            
            let itemIncom = '';
            do {
                itemIncom = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            } while (!isString(itemIncom));
            
            let cashIncom = 0;
            do {
                cashIncom = prompt('Сколько в месяц Вы на этом зарабатываете?', 10000);
            } while (!isNumber(cashIncom));
            
            appData.income[itemIncom] = +cashIncom;
        }
        
        let addExpenses = '';
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                'интернет, такси, коммуналка');
        } while (!isString(addExpenses, true));
        
        appData.addExpenses = addExpenses.toLowerCase().split(',').map(val => val.trim());
        console.log('appData.addExpenses: ', appData.addExpenses);
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for (let i = 0; i < 2; i++) {
            let str = '';
            do {
                str = prompt('Введите обязательную статью расходов?');
            } while (!isString(str));
            appData.expenses[str] = (() => {
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
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: () => { // Подсчитывает за какой период будет достигнута цель
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: () => { // Статус дохода (низкий / средний / высокий)
        return isNaN(appData.budgetDay) ? 'Упс! Где-то закралась ошибка...' :
            (appData.budgetDay < 0) ? 'Что то пошло не так...' :
            (appData.budgetDay < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (appData.budgetDay === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
            (appData.budgetDay < 1200) ? 'У вас средний уровень дохода' :
            (appData.budgetDay === 1200) ?
            'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
            'У вас высокий уровень дохода';
    },
    getIfoDeposit: () => {
        if (appData.deposit) {
            let n = 0;
            do {
                n = prompt('Какой годовой процент?', '10');
            } while (!isNumber(n) && n > 0);
            appData.precentDeposit = +n;
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(n) && n > 0);
            appData.moneyDeposit = +n;
        }
    },
    calcSavedMonye: () => {
        return appData.budgetMonth * appData.period;
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

console.log('2) ' + appData.addExpenses.map((val, i) => val[0].toUpperCase() + val.slice(1)).join(', '));
