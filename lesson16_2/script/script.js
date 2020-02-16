'use strict';

/*

    Задания по уроку №16 №2

*/

/*
1) Два класса, First и Second, Second наследует от First .
2) В First есть метод hello - он печатает в консоль "Привет я метод родителя!".
3) Нужно написать в Second метод hello, чтоб он сначала вызывал метод hello из First, 
а потом сразу печатал в консоль "А я наследуемый метод!"
*/

class First {
    constructor () {}
    hello () {
        console.log('Привет я метод родителя!');
    }
}

class Second extends First {
    constructor () {
        super();
    }
    hello () {
        super.hello();
        console.log('А я наследуемый метод!');
    }   
}

const test = new Second();

test.hello();