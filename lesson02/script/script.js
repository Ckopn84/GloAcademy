let money = 100000,  // Доход за месяц?
    income = 'фриланс', // Статья доп дохода
    addExpenses = 'интернет, такси, коммуналка', // строка с перечислением дополнительных расходов
    deposit = true,
    mission = 10000000, // число (Какую сумму хотите накопить)
    period = 12; // число от 1 до 12 (месяцев)

console.log('type money: ', typeof money);
console.log('type income: ', typeof income);
console.log('type deposit: ', typeof deposit);
console.log('addExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцев.
    Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLocaleLowerCase().split(', '));

const budgetDay = money / 30; // Дневной бюджет (доход за месяц / 30)
console.log('budgetDay: ', budgetDay);
