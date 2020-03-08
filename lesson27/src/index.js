'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import addDot from './modules/addDot';
import setCommandImg from './modules/setCommandImg';
import calc from './modules/calc';
import checkCalcBlock from './modules/checkCalcBlock';
import slider from './modules/slider';
import sendForm from './modules/sendForm';

// Timer
countTimer('20 Feb 2020');
// Меню
toggleMenu();
//popup
togglePopUp();
// tabs
tabs();
// add point dot
addDot();
setCommandImg();
// калькулятор
calc(100);
checkCalcBlock();
// slider
slider();
// send-ajax-form
sendForm();
