"use strict";

const inputText = document.getElementById('myText'),
    myBtn = document.getElementById('myBtn'),
    text = document.getElementById('text');

/* // Пример работы с localStorage (сохранение данный в локальном хранилище до момента,
//пока их не удалят от туда)
const showText = () => {
    text.textContent = localStorage.myText;
};

myBtn.addEventListener('click', () => {
    localStorage.myText = inputText.value;
    showText();
}); */

/* // Пример работы с sessionStorage (сохранение данный только на момент жизни сессиии - 
//если закрыть вкладку, то данные уже потеряются)
const showText = () => {
    text.textContent = sessionStorage.myText;
};

myBtn.addEventListener('click', () => {
    sessionStorage.myText = inputText.value;
    showText();
}); */

/* // Пример работы с localStorage. Методы getItem и setItem
const showText = () => {
    text.textContent = localStorage.getItem('memory');
};

myBtn.addEventListener('click', () => {
    localStorage.setItem('memory', inputText.value); // ключи и значение передаём
    showText();
});

// удаление значения из localStorage по ключу
localStorage.removeItem('myText'); */

/* // Cookie
document.cookie = 'имя=значение'; // живёт только на время сессии
document.cookie = 'имя2=значение3';
document.cookie = 'имя3=значение3';
document.cookie = 'имя=значение4'; // заменит первую запись

// Сохраняем cookie до указанной даты
document.cookie = 'hope=life; expires=Tue, 7 May 2024 00:00:00 GMT'; */

// Функция сохранения сведений в cookie
// encodeURI - кодирует данные, что бы не было проблем со спец символами и/или 
// русскими буквами
// decodeURI - раскодирует текст обратно
const setCookie = (key, value, year, month, day, path, domain, secure) => {
    let cookieStr = encodeURI(key) + '=' + encodeURI(value);
    if (year) {
        const expires = new Date(year, month-1, day);
        cookieStr += '; expires=' + expires.toGMTString();
    }
    cookieStr += path ? '; path=' + encodeURI(path) : '';
    cookieStr += domain ? '; domain=' + encodeURI(domain) : '';
    cookieStr += secure ? '; secure' : '';

    document.cookie = cookieStr;
};

setCookie('Привет', 'мир');
setCookie('Любимый праздник детей', 'Новый  год', 2020, 1, 1);

console.log(decodeURI(document.cookie)); // выведет весь сохранённый массих
