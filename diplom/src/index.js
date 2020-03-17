'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'fetch-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import togglePopUp from './modules/togglePopUp';
import showSentenceBlock from './modules/showSentenceBlock';
import toggleAccordion from './modules/toggleAccordion';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validation from './modules/validation';

togglePopUp();
showSentenceBlock();
toggleAccordion();
calc();
sendForm();
validation();
