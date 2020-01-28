/*
Переменная lang может принимать 2 значения: 'ru' 'en'.
Написать условия при котором в зависимости от значения lang будут выводится дни 
недели на русском или английском языке.
*/
let lang = 'ru';

// Решите задачу через if,
if (lang === 'ru') {
    console.log('Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');
} else if (lang === 'en') {
    console.log('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
} else {
    console.log('Непредвиденное значение!');
}

// Решите задачу через switch-case
switch (lang) {
    case 'ru':
        console.log('Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');
        break;
    case 'en':
        console.log('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
        break;
    default:
        console.log('Непредвиденное значение!');
}

// Решите задачу через многомерный массив без ифов и switch.
let langArr = [];
langArr.ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
langArr.en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
console.log(langArr[lang]);

const langArray = {
    ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};
console.log(langArray[lang]);

/*
У нас есть переменная namePerson. Если значение этой переменной “Артем” то вывести 
в консоль “директор”, если значение “Максим” то вывести в консоль “преподаватель”, 
с любым другим значением вывести в консоль “студент”
Решить задачу с помощью нескольких тернарных операторов, без использования if или switch
*/
const namePerson = '';

console.log((namePerson === 'Артем') ? 'директор' :
    (namePerson === 'Максим') ? 'преподаватель' :
    'студент');