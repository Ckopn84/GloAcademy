'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Timer
    const countTimer = (dedline) => {
        /* const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSecunds = document.querySelector('#timer-seconds'),
            dateStop = new Date(dedline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            // hours = Math.floor((timeRemaining / 60 / 60) % 24);
        // const day = Math.floor(timeRemaining / 60 / 60 / 24);
        // console.log('dateStop: ', dateStop);
        // console.log('dateNow: ', dateNow);
        // console.log('seconds: ', seconds);
        // console.log('minutes: ', minutes);
        // console.log('hours: ', hours);
        // console.log('day: ', day);
        // console.log(new Date());
        timerHours.textContent = hours;
        timerMinutes.textContent = minutes;
        timerSecunds.textContent = seconds; */
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSecunds = document.querySelector('#timer-seconds');
        let idInterval = 0;

        const getTimeRemaining = () => {
            const dateStop = new Date(dedline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = 0,
                minutes = 0,
                hours = 0;
            if (timeRemaining > 0) {
                seconds = Math.floor(timeRemaining % 60);
                minutes = Math.floor((timeRemaining / 60) % 60);
                hours = Math.floor(timeRemaining / 60 / 60);
            }
            /* return {
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            }; */
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        };

        /* const updateClock = () => {
            let timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSecunds.textContent = timer.seconds;

            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            }
        };

        updateClock(); */

        const addZero = elem => {
            if (String(elem).length === 1) { return '0' + elem; } else { return String(elem); }
        };

        const updateClock = () => {
            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSecunds.textContent = addZero(timer.seconds);

            console.log('timer.timeRemaining: ', timer.timeRemaining);
            if (timer.timeRemaining < 0) {
                clearInterval(idInterval);
            }
            console.log('idInterval: ', idInterval);
        };

        idInterval = setInterval(updateClock, 1000);
    };

    // countTimer('19 Feb 2020');
    countTimer('21 Feb 2020');
});