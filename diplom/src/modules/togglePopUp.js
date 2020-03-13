
const togglePopUp = () => {
	const showPopup = elem => elem.style.display = 'block';

	const closePopup = elem => elem.style.display = 'none';

	const initPopup = (classPopup, text = '') => {
		const popup = document.querySelector(classPopup);

		showPopup(popup);

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				closePopup(popup);
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					closePopup(popup);
				}
			}
		});
	};

	const showError = elem => {
		if (elem.nextSibling.id !== 'badInput_' + elem.id) {
			const div = document.createElement('div');

			div.textContent = 'Необходимо заполнить поле!';
			div.id = 'badInput_' + elem.id;
			div.style.color = 'red';
			elem.parentElement.insertBefore(div, elem.nextSibling);
			elem.style.cssText = 'border: 2px solid red; ';
		}
	};

	const checkError = elem => {
		elem.style.cssText = '';

		if (elem.nextSibling.id === 'badInput_' + elem.id) elem.nextSibling.remove();
	}

	document.body.addEventListener('click', event => {
		event.preventDefault();

		const target = event.target;

		if (target.closest('.contacts') && target.classList.contains('call-btn')) initPopup('.popup-call');

		if (target.classList.contains('discount-btn')) initPopup('.popup-discount');

		if (target.classList.contains('check-btn')) initPopup('.popup-check');

		if (target.classList.contains('consultation-btn')) {
			const inputQuestion = document.querySelector('.director-form input');

			if (inputQuestion.value.trim()) {
				checkError(inputQuestion);
				initPopup('.popup-consultation', inputQuestion.value.trim());
			} else {
				showError(inputQuestion);
			}
		}
	});
};

export default togglePopUp;
