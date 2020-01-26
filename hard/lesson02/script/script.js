// Создать переменную num со значением 266219 (тип данных число)
const num = 266219;

// Вывести в консоль произведение (умножение) цифр этого числа
const multiplyingDigitsNumber = str => {
    let res = 1;
    for (let i = 0; i < str.length; i++) {
        res *= str[i];
    }
    return res;
};

const multiplyingDigits = multiplyingDigitsNumber(num.toString());
console.log('2: ', multiplyingDigits);

// Вариант 2
let res2 = 1;
num.toString().split('').forEach(elem => res2 *= elem);
console.log('res2: ', res2);

// Полученный результат возвести в степень 3, используя только 1 оператор (Math.pow не подходит)
const raising = multiplyingDigits ** 3;
console.log('3: ', raising);

// Вывести на экран первые 2 цифры полученного числа
console.log('4: ', raising.toString().substr(0,2));
