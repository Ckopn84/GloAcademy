'use strict';

window.addEventListener('DOMContentLoaded', () => {
	// Timer
	const countTimer = dedline => {
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
			return {
				timeRemaining,
				hours,
				minutes,
				seconds
			};
		};

		const addZero = elem => {
			if (String(elem).length === 1) {
				return '0' + elem;
			} else {
				return String(elem);
			}
		};

		const updateClock = () => {
			const timer = getTimeRemaining();

			timerHours.textContent = addZero(timer.hours);
			timerMinutes.textContent = addZero(timer.minutes);
			timerSecunds.textContent = addZero(timer.seconds);

			if (timer.timeRemaining < 0) {
				clearInterval(idInterval);
				const dateStop = new Date(dedline);
				dateStop.setDate(dateStop.getDate() + 1);
				countTimer(dateStop);
			}
		};

		idInterval = setInterval(updateClock, 1000);
	};

	const animateScroll = () => {

		const target = event.target.closest('[href^="#"]'),
			speed = 0.5;

		if (target) {
			const pageY = window.pageYOffset,
				hash = target.href.replace(/[^#]+(.*)/, '$1'),
				distTopPosition = document.querySelector(hash).getBoundingClientRect().top;

			let start = 0;

			const step = time => {
				if (!start) start = time;

				const progress = time - start;

				const r = (distTopPosition < 0 ?
					Math.max(pageY - progress / speed, pageY + distTopPosition) :
					Math.min(pageY + progress / speed, pageY + distTopPosition));

				window.scrollTo(0, r);

				if (r < pageY + distTopPosition) requestAnimationFrame(step);
			};

			requestAnimationFrame(step);

		}
	};

	// Меню
	const toggleMenu = () => {
		const handlerMenu = () => {
			const target = event.target;

			const displayMenu = () => {
				document.querySelector('menu').classList.toggle('active-menu');
			};

			// if (target.closest('.menu') || !target.closest('menu')) {
			if (target.closest('.menu') ||
				(!target.closest('menu') &&
					document.querySelector('menu').classList.contains('active-menu'))) {
				displayMenu();
			} else if (target.closest('menu') && target.closest('[href^="#"]')) {
				displayMenu();

				if (!target.classList.contains('close-btn')) {
					animateScroll();
				}
			}
		};

		document.body.addEventListener('click', handlerMenu);
	};

	//popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content'),
			popupData = {
				count: -445,
				speed: 10,
				startPos: -445,
				endPos: 0
			};

		const showPopup = () => {

			popupData.startPos > popupData.endPos ?
				popupData.count -= popupData.speed :
				popupData.count += popupData.speed;
			popupContent.style.transform = `translateY(${popupData.count}px)`;

			if (popupData.startPos > popupData.endPos ?
				popupData.count > popupData.endPos :
				popupData.count < popupData.endPos) {
				requestAnimationFrame(showPopup);
			}
		};

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				if (screen.width > 768) {
					popupData.count = popupData.startPos;
					requestAnimationFrame(showPopup);
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
				}
			}

		});
	};

	document.querySelector('main a').addEventListener('click', animateScroll);

	// tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};

	// slider
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			// btn = document.querySelectorAll('.portfolio-btn'),
			dot = document.querySelectorAll('.dot'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide = currentSlide < slide.length - 1 ? currentSlide + 1 : 0;
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 2000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (target.matches('.portfolio-btn, .dot')) {
				prevSlide(slide, currentSlide, 'portfolio-item-active');
				prevSlide(dot, currentSlide, 'dot-active');

				if (target.matches('#arrow-right')) {
					currentSlide++;
				} else if (target.matches('#arrow-left')) {
					currentSlide--;
				} else if (target.matches('.dot')) {
					dot.forEach((elem, index) => {
						if (elem === target) {
							currentSlide = index;
						}
					});
				}

				if (currentSlide >= slide.length) currentSlide = 0;
				if (currentSlide < 0) currentSlide = slide.length - 1;

				nextSlide(slide, currentSlide, 'portfolio-item-active');
				nextSlide(dot, currentSlide, 'dot-active');
			}
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide();
	};

	// add point dot
	const addDot = () => {
		const portfolioItem = document.querySelectorAll('.portfolio-item'),
			portfolioDots = document.querySelector('.portfolio-dots');

		portfolioItem.forEach(() => {
			const dot = document.createElement('li');
			dot.classList.add('dot');
			portfolioDots.appendChild(dot);
		});

		portfolioDots.children[0].classList.add('dot-active');
	};

	const setCommandImg = () => {
		const command = document.querySelector('#command .row');

		const changingPhotos = () => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
				const lastSrc = target.src;

				target.src = target.dataset.img;
				target.dataset.img = lastSrc;
			}
		};

		command.addEventListener('mouseover', changingPhotos);
		command.addEventListener('mouseout', changingPhotos);
	};

	const checkCalcBlock = () => {
		const calcBlock = document.querySelector('.calc-block');

		calcBlock.addEventListener('input', () => {
			if (event.target.type === 'number') {
				event.target.value = event.target.value.replace(/\D/g, '');
			}
		});
	};

	// калькулятор
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquary = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0,
				counrValue = 1,
				dayValue = 10,
				step = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquary.value;

			if (calcCount.value > 1) {
				counrValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value) {
				if (calcDay.value < 5) {
					dayValue *= 2;
				} else if (calcDay.value < 10) {
					dayValue *= 1.5;
				}
			}

			if (!!typeValue && !!squareValue) {
				total = price * typeValue * squareValue * counrValue * dayValue;
			}

			if (+totalValue.textContent !== total) {
				if (totalValue.textContent > total) {
					step = -1;
				}

				const timer = setInterval(() => {
					totalValue.textContent = +totalValue.textContent + step;
					if ((total - totalValue.textContent) * step < 1) {
						clearInterval(timer);
						totalValue.textContent = Math.round(total);
					}
				}, 0);
			}
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;
			if (target.matches('.calc-day') || target.matches('.calc-type') ||
				target.matches('.calc-square') || target.matches('.calc-count')) {
				countSum();
			}
		});
	};

	// send-ajax-form

	const sendForm = () => {
		const errorMessage = 'Что-то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const postData = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();

			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}

				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}
			});

			request.open('POST', './server.php');
			// request.setRequestHeader('Content-Type', 'multipart/form-data');
			request.setRequestHeader('Content-Type', 'application/json');
			// request.send(formData);
			request.send(JSON.stringify(body));
		};

		const clearInput = idForm => {
			const form = document.getElementById(idForm);
			[...form.elements]
				.filter(item =>
					item.tagName.toLowerCase() !== 'button' &&
					item.type !== 'button')
				.forEach(item =>
					item.value = '');
		};

		const isValid = event => {
			const target = event.target;
			if (target.matches('.form-phone')) {
				target.value = target.value.replace(/[^+\d]/g, '');
			}
			if (target.name === 'user_name') {
				target.value = target.value.replace(/[^а-яё ]/gi, '');
			}
			if (target.matches('.mess')) {
				target.value = target.value.replace(/[^а-яё ,.]/gi, '');
			}
		};

		const processingForm = idForm => {
			const form = document.getElementById(idForm);
			const statusMessage = document.createElement('div');

			// statusMessage.textContent = 'Тут будет сообщение!';
			statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
			// form.appendChild(statusMessage);

			form.addEventListener('submit', event => {
				const formData = new FormData(form);
				const body = {};

				statusMessage.textContent = loadMessage;
				event.preventDefault();
				form.appendChild(statusMessage);

				/* for (let val of formData.entries()) {
					body[val[0]] = val[1];
				} */

				formData.forEach((val, key) => {
					body[key] = val;
				});

				postData(body, () => {
					statusMessage.textContent = successMessage;
					clearInput(idForm);
				}, error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
			});
			form.addEventListener('input', isValid);
		};

		processingForm('form1');
		processingForm('form2');
		processingForm('form3');
	};

	countTimer('20 Feb 2020');
	toggleMenu();
	togglePopUp();
	tabs();
	addDot();
	setCommandImg();
	calc(100);
	checkCalcBlock();
	slider();
	sendForm();
});
