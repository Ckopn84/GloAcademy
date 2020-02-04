'use strict';

/*

    Задания по уроку №9

*/

/*
1) Выведите на страницу текущую дату и время в 2-х форматах: 
    a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'
    б) '04.02.2020 - 21:05:33'
2) Для вывода в формате (а) напишите функцию, которая будет менять склонение слов 
в зависимости от числа, "час, часов, часа"
3) Для вывода в формате (б) напишите функцию, которая будет добавлять 0 перед значениями 
которые состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)
4) С помощью функции setInterval, реализуйте вывод даты и времени каждую секунду
*/

const timeDisplay = () => {
    const week = ['Воскресенье, ', 'Понедельник, ', 'Вторник, ', 'Среда, ',
        'Четверг, ', 'Пятница, ', 'Суббота, '];
    const month = [' января ', ' февраля ', ' марта ',
        ' апреля ', ' мая ', ' июня ',
        ' июля ', ' августа ', ' сентября ',
        ' октября ', ' ноября ', ' декабря '];
    const date = new Date();

    const addZero = elem => {
        if (String(elem).length === 1) { return '0' + elem; } else { return String(elem); }
    };
    const changeEnding = (num, timeElem = '') => {
        // const textVariant = (() => {return timeElem === 'h' ? [' час ', ' часа ', ' часов '] :
        //     timeElem === 'm' ? [' минута ', ' минуты ', ' минут '] :
        //     [' секунда ', ' секунды ', ' секунд '];})();
        const textVariant = (timeElem === 'h' ? [' час ', ' часа ', ' часов '] :
            timeElem === 'm' ? [' минута ', ' минуты ', ' минут '] :
            [' секунда ', ' секунды ', ' секунд ']);
        const n = num % 10;
        return num > 4 && num < 20 ? num + textVariant[2] : 
            n === 1 ? num + textVariant[0] : 
            n > 1 && n < 5 ? num + textVariant[1] :
            num + textVariant[2];
    };

    const textTime = 'Сегодня ' + week[date.getDay()] + date.getDay() + month[date.getMonth()] + 
    date.getFullYear() + ' года, ' + changeEnding(date.getHours(), 'h') + 
    changeEnding(date.getMinutes(), 'm') + changeEnding(date.getSeconds());
    const time = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds()) + ' ' + 
    addZero(date.getDay()) + '.' + addZero(date.getMonth()) + '.' + date.getFullYear();

    document.querySelector('.text-time').textContent = textTime;
    document.querySelector('.time').textContent = time;

    console.clear();
    console.log(textTime);
    console.log(time);
};

let elem = document.createElement('div');
elem.classList.add('text-time');
document.body.appendChild(elem);

elem = document.createElement('div');
elem.classList.add('time');
document.body.appendChild(elem);
console.dir(elem);

setInterval(timeDisplay, 1000);
// timeDisplay();
