'use strict';

/*

    Задания по уроку №21

1.Написать скрипт, которые заменяет слово "функция" и его однокоренные слова в 
div с id=task1 на «<strong>функция</strong>». 
2. Написать скрипт который в div с id=task2 найдет время. Время имеет формат 
часы:минуты. И часы, и минуты состоят из двух цифр, пример: 09:00.
заключить найденное время в тег <b></b>
3. Создать запрос во всем документе найти текст в кавычках и заключить его 
в теги <mark></mark>
4. Замените в документе домены вида http://site.ru 
на <a href="http://site.ru">site.ru</a>, 
5. Напишите регулярное выражение для поиска цвета, заданного как #ABCDEF, 
вывести цвет в консоль
6. Ссылки такого вида http://site.ru/aaaa/bbbb.html заменить
на <a href="http://site.ru/aaaa/bbbb.html">site.ru</a>

Попрактикуйтесь на кроссвордах https://regexcrossword.com/
и на задачках https://habr.com/ru/post/167015/
 */

const task1 = document.getElementById('task1');
const task2 = document.getElementById('task2');
const body = document.body;

    // (?:(?=.функци[а-я])[^>]функци[а-я]|^$)
    // (?!>функци[яию]<).функци[яию].
    // https?:\/\/([\da-z\.-]+)\.([a-z]{2,6})\/?(?:(?=[\/\w\.]{1})[\/\w-]*|\/)\/?
    // https?:\/\/([\da-z\.-]+)\.([a-z]{2,6})\/?(?:(?=[\.]{1})|[\/\w\.-]*)\/?

task1.innerHTML = task1.innerHTML
    .replace(/функци[яию]{1}/g, math => `<strong>${math}<\/strong>`);
task2.innerHTML = task2.innerHTML
    .replace(/\d{2}:\d{2}/g, math => `<b>${math}</b>`);

body.innerHTML = body.innerHTML
    .replace(/«/g, () => '<mark>«').replace(/»/g, () => '»</mark>');
body.innerHTML = body.innerHTML
    .replace(/ "[^"\\]+(?:\\.[^"\\]*)*"/g, math => `<mark>${math}</mark>`);

// console.log(body.innerHTML.match(/ "[^"\\]+(?:\\.[^"\\]*)*"/g));
body.innerHTML = body.innerHTML
    .replace(/https?:\/\/(([\da-z\.-]+)\.([a-z]{2,6}))\/?(?:(?=[\.]{1})|[\/\w\.-]*)\/?/g, math => {
        console.log(math.match(/https?:\/\/(([\da-z\.-]+)\.([a-z]{2,6}))\/?(?:(?=[\.]{1})|[\/\w\.-]*)\/?/));
        return `<a href="${math}">${math.match(/https?:\/\/(([\da-z\.-]+)\.([a-z]{2,6}))\/?(?:(?=[\.]{1})|[\/\w\.-]*)\/?/)[1]}</a>`;
    });

// console.log(body.innerHTML.match(/(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/));

console.log(body.innerHTML.match(/#[0-9A-Fa-f]{6}/g));