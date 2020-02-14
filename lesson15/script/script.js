'use strict';

/*

    Задания по уроку №15

*/

/*
1) Привести проект в соответствии с новым стандартом.
2) В нашем проекте "Budget" переделать класс под новый формат с помощью ключевого 
слова Class и Constuctor()
3) Переменные, существующие только с неизменяемым параметром, объявить через const
*/

const start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0], // + Дополнительный доход
    expensesPlus = btnPlus[1], // + Возможные расходы
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), // Возможный доход
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], // Накопления за период
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'), // Месячный доход
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'), // range
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
    targetAmount = document.querySelector('.target-amount'); // Цель
let expensesItems = document.querySelectorAll('.expenses-items'), // Возможные расходы
    incomeItems = document.querySelectorAll('.income-items'); // Дополнительный доход

class AppData {
    constructor() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.precentDeposit = 0;
        this.moneyDeposit = 0;
    }
}

AppData.prototype.start = function () {
    if (start.textContent === 'Рассчитать') {
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getIfoDeposit();
        this.getStatusIncome();
        this.showResult();
        this.blockage();
        start.textContent = 'Сбросить';
    } else {
        start.textContent = 'Рассчитать';
        this.reset();
    }
    console.dir(this);
};

AppData.prototype.getExpenses = function () {
    expensesItems.forEach(item => {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function () {
    incomeItems.forEach(item => {
        const itemIncome = item.querySelector('.income-title').value;
        const cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +cashIncome;
            this.incomeMonth += +cashIncome;
        }
    });
};

AppData.prototype.getExpensesMonth = function () {
    for (let elem in this.expenses) {
        this.expensesMonth += this.expenses[elem];
    }
};

AppData.prototype.getAddExpenses = function () {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach(item => {
        const itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getBudget = function () {
    this.budget = +salaryAmount.value;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getIfoDeposit = function () {
    // if (appData.deposit) {
    //     let n = 0;
    //     do {
    //         n = prompt('Какой годовой процент?', '10');
    //     } while (!isNumber(n) && n > 0);
    //     appData.precentDeposit = +n;
    //     do {
    //         appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    //     } while (!isNumber(n) && n > 0);
    //     appData.moneyDeposit = +n;
    // }
    this.moneyDeposit = 0;
};

AppData.prototype.getStatusIncome = function () {
    return isNaN(this.budgetDay) ? 'Упс! Где-то закралась ошибка...' :
        (this.budgetDay < 0) ? 'Что то пошло не так...' :
        (this.budgetDay < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
        (this.budgetDay === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
        (this.budgetDay < 1200) ? 'У вас средний уровень дохода' :
        (this.budgetDay === 1200) ?
        'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
        'У вас высокий уровень дохода';
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay * 100) / 100;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.blockage = function (disabled = true) {
    document.querySelectorAll('.data input[type=text]').forEach(item => {
        item.disabled = disabled;
    });
    document.querySelector('.data input[type=checkbox]').disabled = disabled;
    incomePlus.disabled = disabled;
    expensesPlus.disabled = disabled;
};

AppData.prototype.reset = function () {
    for (let i = incomeItems.length - 1; i > 0; i--) {
        incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
    incomePlus.style.display = '';
    expensesPlus.style.display = '';
    this.blockage(false);
    document.querySelectorAll('input[type=text]').forEach(item => {
        item.value = '';
    });
    periodSelect.value = document.querySelector('.period-amount').textContent = 1;
    
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.precentDeposit = 0;
    this.moneyDeposit = 0;
    
    this.blockStart();
};

AppData.prototype.addExpensesBlock = function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changePeriodSelect = function () {
    document.querySelector('.period-amount').textContent = event.target.value;
    incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.blockStart = function () {
    start.disabled = !salaryAmount.value.trim();
};

AppData.prototype.check = function () {
    let tmpValue = event.target.value.trim();
    const target = event.target;

    const changeInputNumber = event => {
        let condition = /.+/,
            textAlert;
        if (target.placeholder === 'Наименование') {
            condition = /^[,. а-яА-ЯёЁ]+$/;
            textAlert = 'Доупускается ввод только русских букв, пробела, точки и запятой!';
        }
        if (target.placeholder === 'Сумма') {
            condition = /^[\d]+$/;
            textAlert = 'Доупускается ввод только цифр!';
        }
        if (!condition.test(target.value.trim()) && target.value.trim() !== '') {
            alert(textAlert);
            target.value = tmpValue;
            target.removeEventListener('change', changeInputNumber);
        }
        tmpValue = target.value.trim();
    };
    target.addEventListener('change', changeInputNumber);
};

AppData.prototype.eventsListeners = function () {
    this.blockStart();
    start.addEventListener('click', this.start.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.changePeriodSelect.bind(this));
    salaryAmount.addEventListener('input', this.blockStart);
    document.querySelectorAll('.data input').forEach(input => {
        input.addEventListener('focus', this.check);
    });
};

const appData = new AppData();

appData.eventsListeners();