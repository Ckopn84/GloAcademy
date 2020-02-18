'use strict';

/*

    Задания по уроку №16

*/

/*
1) Необходимо сохранять данные при перезагрузки страницы или после закрытия браузера. 
Для этого нам понадобиться cookie и localStorage
(ВНИМАНИЕ! Cookie будут сохраняться только если вы запускаете проект с сервера, то 
есть в адресной строке должно быть http:// или https://)
2) После нажатия кнопки Рассчитать, данные из правой части записываем в созданный 
вами localStorage и cookie(+ еще одну куку isLoad, которую нужно приравнять к true), 
для каждого значения отдельная куки. 
3) При перезагрузки вставляются уже в правую часть. Левая часть так же остается 
заблокированной.
4) Если нажимаем сбросить, то из локального хранилища удаляется все
5) При выходе из браузера, перезагрузке все данные должны возвращаться на свои 
места (если они там были)
6) Если пользователь удаляет хотя бы одну из кук или она не соответствует тому, 
что храниться в localStorage(кука name должна равняться свойству name в локальном 
хранилище), тогда принудительно удаляем наши куки и локальное хранилище и 
программа запускается ПОЛНОСТЬЮ заново. (очищается объект от данных)
*/

const start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0], // + Дополнительный доход
    expensesPlus = btnPlus[1], // + Возможные расходы
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0], // Дневной бюджет
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0], // Доход за месяц
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0], // Расход за месяц
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0], // Возможные доходы
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0], // Возможные расходы
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], // Накопления за период
    targetMonthValue = document.getElementsByClassName('target_month-value')[0], // Срок достижения цели в месяцах
    salaryAmount = document.querySelector('.salary-amount'), // Месячный доход
    periodSelect = document.querySelector('.period-select'), // range
    periodAmount = document.querySelector('.period-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), // Возможный доход
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
    targetAmount = document.querySelector('.target-amount'); // Цель

let appDataStorage = localStorage.getItem('appDataStorage') ? JSON.parse(localStorage.getItem('appDataStorage')) : {
    budgetDayValue: '',
    budgetMonthValue: '',
    expensesMonthValue: '',
    additionalIncomeValue: '',
    additionalExpensesValue: '',
    incomePeriodValue: '',
    targetMonthValue: ''
};

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

    start() {
        if (start.textContent === 'Рассчитать') {
            this.getExpInc();
            this.getExpensesMonth();
            this.getAdd();
            this.getIfoDeposit();
            this.getBudget();
            this.getStatusIncome();
            this.showResult();
            this.blockage();
            start.textContent = 'Сбросить';
        } else {
            start.textContent = 'Рассчитать';
            this.reset();
        }
    }

    getExpInc() {
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
    }

    getExpensesMonth() {
        for (let elem in this.expenses) {
            this.expensesMonth += this.expenses[elem];
        }
    }

    getAdd() {
        const joinElem = item => {
            return item.map(el => el.trim()).filter(el => el !== '');
        };

        this.addExpenses = joinElem(additionalExpensesItem.value.split(','));
        this.addIncome = joinElem([additionalIncomeItem[0].value, additionalIncomeItem[1].value]);
    }

    getBudget() {
        const mansDeposit = this.moneyDeposit * (this.precentDeposit / 100);

        this.budget = +salaryAmount.value;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + mansDeposit;
        this.budgetDay = this.budgetMonth / 30;
    }

    getIfoDeposit() {
        this.moneyDeposit = 0;
        this.precentDeposit = 0;
        if (this.deposit) {
            this.precentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    getStatusIncome() {
        return isNaN(this.budgetDay) ? 'Упс! Где-то закралась ошибка...' :
            (this.budgetDay < 0) ? 'Что то пошло не так...' :
            (this.budgetDay < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (this.budgetDay === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
            (this.budgetDay < 1200) ? 'У вас средний уровень дохода' :
            (this.budgetDay === 1200) ?
            'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
            'У вас высокий уровень дохода';
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay * 100) / 100;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = targetAmount.value ? Math.ceil(this.getTargetMonth()) : '';
        incomePeriodValue.value = this.calcPeriod();
    }

    blockage(disabled = true) {
        document.querySelectorAll('.data input[type=text]').forEach(item => {
            item.disabled = disabled;
        });
        depositCheck.disabled = disabled;
        depositBank.disabled = disabled;
        incomePlus.disabled = disabled;
        expensesPlus.disabled = disabled;
    }

    reset() {
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
        depositCheck.checked = false;

        this.depositHandler();

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
    }

    addBlock() {
        const target = event.target;
        const startStr = target.parentNode.className;
        const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
        cloneItem.querySelector(`.${startStr}-title`).value = '';
        cloneItem.querySelector(`.${startStr}-amount`).value = '';
        target.parentNode.insertBefore(cloneItem, target);
        if (document.querySelectorAll(`.${startStr}-items`).length === 3) {
            target.style.display = 'none';
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    changePeriodSelect() {
        periodAmount.textContent = event.target.value;
        incomePeriodValue.value = this.calcPeriod();
    }

    blockStart() {
        start.disabled = !salaryAmount.value.trim() ||
            (depositCheck.checked && !(depositPercent.value.trim() && depositAmount.value.trim()));
    }

    check() {
        const target = event.target;
        let tmpValue = target.value.trim();

        const changeInputNumber = () => {
            let condition = /.+/,
                textAlert;
            let validPervent = true;
            if (target.placeholder === 'Наименование') {
                condition = /^[,. а-яА-ЯёЁ]+$/;
                textAlert = 'Доупускается ввод только русских букв, пробела, точки и запятой!';
            }
            if (target.placeholder === 'Сумма') {
                condition = /^[\d.]+$/;
                textAlert = 'Доупускается ввод только цифр!';
            }
            if (target.placeholder === 'Процент') {
                condition = /^[\d.]+$/;
                textAlert = 'Введите корректное значение в поле проценты! (число от 1 до 100)';
                validPervent = (+target.value.trim() > 0) && (+target.value.trim() < 100);
            }
            if (!condition.test(target.value.trim()) && target.value.trim() || !validPervent) {
                alert(textAlert);
                target.value = tmpValue;
            }
            target.removeEventListener('change', changeInputNumber);
        };
        target.addEventListener('change', changeInputNumber);
    }

    depositPercent() {
        const valueIndex = this.value;

        if (!valueIndex) {
            depositAmount.disabled = true;
        } else {
            depositAmount.disabled = false;
            if (valueIndex === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = valueIndex;
            }
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            depositAmount.disabled = true;
            this.deposit = true;
            depositBank.addEventListener('change', this.depositPercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.depositPercent);
        }
        this.blockStart();
    }

    eventsListeners() {
        this.blockStart();
        start.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', this.addBlock);
        incomePlus.addEventListener('click', this.addBlock);
        periodSelect.addEventListener('input', this.changePeriodSelect.bind(this));
        salaryAmount.addEventListener('input', this.blockStart);
        depositAmount.addEventListener('input', this.blockStart);
        depositPercent.addEventListener('input', this.blockStart);
        document.querySelectorAll('.data input').forEach(input => {
            input.addEventListener('focus', this.check);
        });
        depositAmount.addEventListener('focus', this.check);
        depositPercent.addEventListener('focus', this.check);
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }

    addToStorage() {
        localStorage.setItem('appDataStorage', JSON.stringify(appDataStorage));
    }

    setCookie(key, value, year, month, day, path, domain, secure) {
        let cookieStr = encodeURI(key) + '=' + encodeURI(value);
        if (year) {
            const expires = new Date(year, month - 1, day);
            cookieStr += '; expires=' + expires.toGMTString();
        } else {
            const expires = new Date();
            expires.setMonth(expires.getMonth() + 1);
            cookieStr += '; expires=' + expires.toGMTString();
        }
        cookieStr += path ? '; path=' + encodeURI(path) : '';
        cookieStr += domain ? '; domain=' + encodeURI(domain) : '';
        cookieStr += secure ? '; secure' : '';

        document.cookie = cookieStr;
    }
}

const appData = new AppData();

appData.eventsListeners();