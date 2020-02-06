'use strict';

/*

    Задания по уроку №10

*/

/*
https://codepen.io/ckopn84/pen/vYOBVjw
Добавлять новые <li> элементы с текстом из инпута
*/

const addLi = () => {
    const input = document.querySelector('input');
    if (input.value.trim().length > 0) {
        const li = document.createElement('li');
        li.innerText = input.value.trim();
        document.querySelector('ul').appendChild(li);
    }
    console.log(input);
};

const button = document.querySelector('button');
button.addEventListener('click', addLi);
