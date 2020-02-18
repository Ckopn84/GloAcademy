'use strict';

/*

    Бонусное задание (26 из 52) Задача 3

*/

const cityArr = {
    rus: ["Москва", "Санк-Петербург", "Новосибирск", "Екатеринбург", "Нижний Новгород", "Казань", "Челябинск"],
    uk: ["Киев", "Харьков", "Одесса", "Днепр", "Донецк", "Запорожье", "Львов"],
    bel: ["Минск", "Гомель", "Могилёв", "Витебск", "Гродно", "Брест"],
    jap: ["Токио", "Киото", "Осака", "Иокогама"]
};

const city = document.querySelector('#city');

const selectCountry = () => {
    city.style.display = 'inline-block';
    city.innerHTML = '';
    cityArr[event.target.value].forEach((item) => {
        const option = document.createElement('option');
        option.innerText = item;
        option.value = event.target.options[event.target.options.selectedIndex].text;
        city.append(option);
    });
};

document.querySelector('#country').addEventListener('change', selectCountry);

city.addEventListener('change', () => {
    document.querySelector('.result').innerText = event.target.value + ', ' + 
        event.target.options[event.target.options.selectedIndex].text;
});

