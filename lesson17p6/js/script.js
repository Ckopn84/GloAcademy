'use strict';
/*
Добрый день (утро, вечер, ночь в зависимости от времени суток)
Сегодня: Понедельник
Текущее время:12:05:15 PM
До нового года осталось 175 дней
*/
/* 
22:00 - 05:00 - ночь
05:00 - 10:00 - утро
10:00 - 17:00 - день
17:00 - 22:00 - вечер
*/

const date = new Date(),
    days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ],
    hours = date.getHours(),
    day = days[date.getDay()],
    time = date.toLocaleTimeString('en'),
    newDate = new Date(new Date().getFullYear() + 1, 0, 1);

/* console.log('date: ', 
    date.toLocaleDateString('ru'), // 19.02.2020
    date.toLocaleString('ru'), // 19.02.2020, 18:51:35
    date.toLocaleTimeString('ru') // 18:51:35
); */
console.log(Math.ceil((newDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24));

const greeting = document.createElement('div'),
    dyaOfWeek = document.createElement('div'),
    currentTime = document.createElement('div'),
    newYearDays = document.createElement('div');

const changeEnding = (num) => {
    const textVariant = [' день', ' дня', ' дней'];
    const n1 = num % 100,
        n2 = num % 10;
    return n1 > 4 && n1 < 21 ? num + textVariant[2] :
        n2 === 1 ? num + textVariant[0] :
        n2 > 1 && n2 < 5 ? num + textVariant[1] :
        num + textVariant[2];
};

greeting.textContent = hours < 5 || hours > 22 ? 'Доброй ночи' :
    hours < 10 ? 'Доброе утро' :
    hours < 17 ? 'Добрый день' :
    'Добрый вечер';
dyaOfWeek.textContent = 'Сегодня: ' + day;
currentTime.textContent = 'Текущее время: ' + time;
newYearDays.textContent = 'До нового года осталось ' + 
    changeEnding(Math.ceil((newDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24));

document.body.append(greeting, dyaOfWeek, currentTime, newYearDays);