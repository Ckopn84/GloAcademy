'use strict';

/*
Создайте функцию, которая принимает 1 аргумент (название произвольное)
— Если в качестве аргумента передана не строка - функция оповещает об этом пользователя
— В полученной (как аргумент) строке функция должна убрать все пробелы в начале и в конце
— Если строка более 30 знаков - то после 30го символа часть текста скрывается и вместо них появляются три точки (...)
*/

const foo = (arg) => {
    let res = 'Ожидается появление строки...';
    if (typeof arg === "string") {
        const maxLength = 30;
        const str = arg.trim();
        if (str.length > maxLength) {
            res = str.substr(0,maxLength) + '...';
        } else {
            res = str;
        }
    }
    return res;
};

console.log('foo(): ', foo(5));
console.log('foo(): ', foo('    Строка менее 30 символов     '));
console.log('foo(): ', foo('    Строка более 30 символов - ну очень при очень длинная строчка получилась!'));