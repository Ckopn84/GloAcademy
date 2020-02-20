'use strict';

/*

    Задания по уроку №17 п.2

*/

/*
Написать любую анимацию, используя requestAnimationFrame и кнопку, активирующую её
Кнопка должна ставить анимацию на паузу и продолжать анимацию после повторного нажатия + 
Добавить кнопку reset, которая будет возвращать анимацию в первоначальное состояние
*/

document.body.style.backgroundColor = '';

const btnStart = document.createElement('button'),
    btnReset = document.createElement('button'),
    divImg = document.createElement('div'),
    img = document.createElement('img'),
    div = document.createElement('div'),
    imgGoose = document.createElement('img');
let flyInterval = 0;

const resetCanvas = () => {
    if (flyInterval > 0) {
        cancelAnimationFrame(flyInterval);
    }
    div.style.left = (document.body.clientWidth) + 'px';
    // div.style.top = (document.body.clientHeight - img.height) + 'px';
    divImg.style.left = '1px';
    divImg.style.top = '5px';
    btnStart.textContent = 'Start';
};

const flyAnimate = () => {
    const l = parseFloat(divImg.style.left),
        lm = parseFloat(div.style.left);
    if (l < window.innerWidth) {
        if (l > (window.innerWidth / 4) && lm > -img.width) {
            div.style.left = (lm - 3) + 'px';
        }
        divImg.style.left = (l + 1) + 'px';
        flyInterval = requestAnimationFrame(flyAnimate);
    } else {
        cancelAnimationFrame(flyInterval);
        btnStart.textContent = 'Stoped';
        alert('Спасибо за внимание! Для повтора нажмите "Reset"');
    }
};

const startAnimation = () => {
    if (btnStart.textContent === 'Start') {
        btnStart.textContent = 'Pause';
        flyInterval = requestAnimationFrame(flyAnimate);
    } else if (btnStart.textContent !== 'Stoped') {
        btnStart.textContent = 'Start';
        cancelAnimationFrame(flyInterval);
    }
};

btnStart.textContent = 'Start';
btnReset.textContent = 'Reset';
img.src = './img/mazda.png';
img.width = '110';
// img.height = '62';
imgGoose.src = './img/tHi.gif';
imgGoose.width = '110';
div.style.position = 'relative';
divImg.style.position = 'relative';

divImg.appendChild(imgGoose);
div.appendChild(img);

btnStart.addEventListener('click', startAnimation);
btnReset.addEventListener('click', resetCanvas);

document.body.appendChild(btnStart);
document.body.appendChild(btnReset);
document.body.appendChild(divImg);
document.body.appendChild(div);

resetCanvas();
