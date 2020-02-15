'use strict';

/*

    Задания по уроку №15

*/

/*
— Мы сделали 1 универсальный метод getExpInc на основе 2 предыдущих(getExpenses/getIncome), 
но у нас остались еще 2 пары методов, которые дублируют один и тот же код 
(addExpensesBlock/addIncomeBlock и getAddIncome/getAddExpenses).
— Нужно создать 2 универсальных метода, которые будут принимать параметры, 
в зависимости от которых будут происходить нужные нам действия.
*/

const start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0], // + Дополнительный доход
    expensesPlus = btnPlus[1], // + Возможные расходы
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0], // Возможные расходы
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], // Накопления за период
    targetMonthValue = document.getElementsByClassName('target_month-value')[0], // Срок достижения цели в месяцах
    salaryAmount = document.querySelector('.salary-amount'), // Месячный доход
    // additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'), // range
    periodAmount = document.querySelector('.period-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), // Возможный доход
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
    targetAmount = document.querySelector('.target-amount'); // Цель

class AppData {
    constructor() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.expenses = {};
        this.expensesMonth = 0;
        this.addIncome = [];
        this.addExpenses = [];
        this.deposit = false;
        this.precentDeposit = 0;
        this.moneyDeposit = 0;
    }
}

AppData.prototype.start = function () {
    if (start.textContent === 'Рассчитать') {
        this.getExpInc();
        this.getExpensesMonth();
        this.getAdd();
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
};

AppData.prototype.getExpInc = function () {
    const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if (itemTitle !== '' && itemAmount !== '') {
            this[startStr][itemTitle] = +itemAmount;
            this.incomeMonth += startStr === 'income' ? +itemAmount : null;
        }
    };

    document.querySelectorAll('.income-items').forEach(count);
    document.querySelectorAll('.expenses-items').forEach(count);
};

AppData.prototype.getExpensesMonth = function () {
    for (let elem in this.expenses) {
        this.expensesMonth += this.expenses[elem];
    }
};

AppData.prototype.getAdd = function () {
    // const joinElem = item => {
    //     return item.value.split(',').map(el => el.trim()).filter(el => el !== '').join(', ');
    // };
    // additionalExpensesValue.value = joinElem(additionalExpensesItem);
    // const arrItem = [];
    // additionalIncomeItem.forEach(el => {
    //     arrItem.push(joinElem(el));
    // });
    // additionalIncomeValue.value = arrItem.filter(el => el !== '').join(', ');
    const joinElem = item => {
        return item.map(el => el.trim()).filter(el => el !== '');
    };

    this.addExpenses = joinElem(additionalExpensesItem.value.split(','));
    this.addIncome = joinElem([additionalIncomeItem[0].value, additionalIncomeItem[1].value]);
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
    targetMonthValue.value = targetAmount.value ? Math.ceil(this.getTargetMonth()) : '';
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
    const excessRemoval = item => {
        for (let i = item.length - 1; i > 0; i--) {
            item[0].parentNode.removeChild(item[i]);
        }
    };
    excessRemoval(document.querySelectorAll('.income-items'));
    excessRemoval(document.querySelectorAll('.expenses-items'));

    this.blockage(false);

    incomePlus.style.display = '';
    expensesPlus.style.display = '';

    document.querySelectorAll('input[type=text]').forEach(item => {
        item.value = '';
    });

    periodSelect.value = periodAmount.textContent = 1;

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.expenses = {};
    this.expensesMonth = 0;
    this.addIncome = [];
    this.addExpenses = [];
    this.deposit = false;
    this.precentDeposit = 0;
    this.moneyDeposit = 0;

    this.blockStart();
};

AppData.prototype.addBlock = function () {
    const target = event.target;
    const startStr = target.parentNode.className;
    const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
    cloneItem.querySelector(`.${startStr}-title`).value = '';
    cloneItem.querySelector(`.${startStr}-amount`).value = '';
    target.parentNode.insertBefore(cloneItem, target);
    if (document.querySelectorAll(`.${startStr}-items`).length === 3) {
        target.style.display = 'none';
    }
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changePeriodSelect = function () {
    periodAmount.textContent = event.target.value;
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
    expensesPlus.addEventListener('click', this.addBlock);
    incomePlus.addEventListener('click', this.addBlock);
    periodSelect.addEventListener('input', this.changePeriodSelect.bind(this));
    salaryAmount.addEventListener('input', this.blockStart);
    document.querySelectorAll('.data input').forEach(input => {
        input.addEventListener('focus', this.check);
    });
};

const appData = new AppData();

appData.eventsListeners();