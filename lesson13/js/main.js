"use strict";

/* 

    Занятие 13

*/

/* 
1) Добавление новых дел по нажатию ENTER и на кнопку ПЛЮС
2) Удаление дел на кнопку КОРЗИНА
3) Отмечать выполненные дела, выполненные дела должны перемещаться в блок с выполненными делами
4) Сохранять данные о делах в localStorage (советую в виде массива)
*/

document.addEventListener('DOMContentLoaded', () => {
    const btnAdd = document.querySelector('#add'),
        headerInput = document.querySelector('.header-input'),
        todo = document.querySelector('#todo'),
        completed = document.querySelector('#completed');

    let todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : {
        todo: [],
        completed: []
    };

    const addToStorage = () => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
        console.log(todoList);
    };

    const newTodo = todoText => {
        const moveTodo = () => {
            const elem = event.target.parentNode.parentNode;
            if (elem.parentNode.className === 'todo') {
                todoList.todo.splice([].indexOf.call(elem.parentNode.children, elem), 1);
                todoList.completed.unshift(elem.textContent);
                completed.insertBefore(elem, completed.childNodes[0]);
            } else {
                todoList.completed.splice([].indexOf.call(elem.parentNode.children, elem), 1);
                todoList.todo.unshift(elem.textContent);
                todo.insertBefore(elem, todo.childNodes[0]);
            }
            addToStorage();
        };

        const removeTodo = () => {
            const elem = event.target.parentNode.parentNode;
            if (elem.parentNode.className === 'todo') {
                console.log([].indexOf.call(elem.parentNode.children, elem));
                todoList.todo.splice([].indexOf.call(elem.parentNode.children, elem), 1);
            } else {
                todoList.completed.splice([].indexOf.call(elem.parentNode.children, elem), 1);
            }
            elem.parentNode.removeChild(elem);

            addToStorage();
        };

        const todoItem = document.createElement('li'),
            todoButtons = document.createElement('div'),
            todoRemove = document.createElement('button'),
            todoComplete = document.createElement('button');

        todoItem.className = 'todo-item';
        todoButtons.className = 'todo-buttons';
        todoRemove.className = 'todo-remove';
        todoComplete.className = 'todo-complete';

        todoRemove.addEventListener('click', removeTodo);
        todoComplete.addEventListener('click', moveTodo);
        todoButtons.appendChild(todoRemove);
        todoButtons.appendChild(todoComplete);
        todoItem.textContent = todoText;
        todoItem.appendChild(todoButtons);

        return todoItem;
    };

    const addTodo = () => {
        event.preventDefault();
        todo.insertBefore(newTodo(headerInput.value.trim()), todo.childNodes[0]);
        todoList.todo.unshift(headerInput.value.trim());
        headerInput.value = '';

        addToStorage();
    };

    for (let i = todo.children.length - 1; i >= 0; i--) {
        todo.removeChild(todo.children[i]);
        todo.textContent = '';
    }
    for (let i = completed.children.length - 1; i >= 0; i--) {
        completed.removeChild(completed.children[i]);
        completed.textContent = '';
    }

    for (let i = 0; i < todoList.todo.length; i++) {
        todo.appendChild(newTodo(todoList.todo[i]));
    }
    for (let i = 0; i < todoList.completed.length; i++) {
        completed.appendChild(newTodo(todoList.completed[i]));
    }

    btnAdd.addEventListener('click', addTodo);
});
