'use strict';

/*

    Задания по уроку №20

*/

const isPalindrome = str => {
    const strRevers = str.split('').reverse().join('');
    return str === strRevers;
};

const searchPalinfrome = str => {
    let result = '';
    for (let i = str.length; i > 1 && !result; i--) {
        for (let j = 0; j <= str.length - i && !result; j++) {
            result = isPalindrome(str.substr(j, i)) ? str.substr(j, i) : '';
        }
    }
    return result;
};

console.log(searchPalinfrome('fffkffgffkfdk'));
console.log(searchPalinfrome('абвгоогвфф'));
