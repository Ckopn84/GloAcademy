'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import addDot from './modules/addDot';
import setCommandImg from './modules/setCommandImg';
import calc from './modules/calc';
import slider from './modules/slider';
import sendForm from './modules/sendForm';

// Timer
countTimer('20 Feb 2020');
// Menu
toggleMenu();
// popup
togglePopUp();
// tabs
tabs();
// add point dot
addDot();
// change the team photo
setCommandImg();
// cost calculator
calc(100);
// slider
slider();
// send-ajax-form
sendForm();
