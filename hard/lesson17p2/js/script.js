'use strict';

/*

    Задания по уроку №14

*/

/*
1) Сделать класс DomElement, который
   содержит свойства
  - selector, 
  - height, 
  - width, 
  - bg, 
  - fontSize
содержит метод, который создает элемент на странице в зависимости от условия:  
- если строка selector начинается с точки, создаем div с классом
- если строка selector  начинается с решетки # то создаем параграф с id
пример:
если передана строка '.block', то функция конструктор создает элемент с class="block"
если передана строка '#best', то функция конструктор создает элемент с id =best"
с помощью cssText задавать стили: 
  - высотой - height,
  - шириной - width, 
  - background - bg
  - размер текста fontSize 
внутрь созданного блока записывать любой текст. Метод записи может быть любым.
2) Создать новый объект на основе класса DomElement
3) Вызвать его метод чтобы получить элемент на странице
*/

function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.newElem = function () {
    let elem;
    if (this.selector[0] === '.') {
        elem = document.createElement('div');
        elem.className = this.selector.slice(1);
    }
    if (this.selector[0] === '#') {
        elem = document.createElement('p');
        elem.id = this.selector.slice(1);
        // elem.textContent = 'Тестовая запись';
    }
    elem.style.cssText = `height: ${this.height}px;
        width: ${this.width}px;
        background: ${this.bg};
        font-size: ${this.fontSize}px;`;
    // console.log(elem);
    return elem;
};

let elDiv = new DomElement('.block', 100, 200, 'green', 12);
let elParagraph = new DomElement('#best', 150, 400, 'red', 12);

document.body.appendChild(elDiv.newElem());
document.body.appendChild(elParagraph.newElem());
