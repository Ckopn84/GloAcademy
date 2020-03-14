
const togglePopUp = () => {
	const initPopup = (classPopup, data = {}) => {
		const popup = document.querySelector(classPopup);

		const showPopup = elem => elem.style.display = 'block';

		const closePopup = elem => elem.style.display = 'none';

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
			elem.style.cssText = 'border: 2px solid red; margin-bottom: 0rem';
		}
	};

	const checkError = elem => {
		elem.style.cssText = '';

		if (elem.nextSibling.id === 'badInput_' + elem.id) elem.nextSibling.remove();
	}

	document.body.addEventListener('click', event => {
		// event.preventDefault();

		const target = event.target;

		if (target.type !== 'submit') event.preventDefault();

		if (target.closest('.contacts') && target.classList.contains('call-btn')) initPopup('.popup-call');

		if (target.classList.contains('discount-btn')) initPopup('.popup-discount');

		if (target.classList.contains('check-btn')) initPopup('.popup-check');

		if (target.classList.contains('consultation-btn')) {
			const inputQuestion = document.querySelector('.director-form input');

			if (inputQuestion.value.trim()) {
				checkError(inputQuestion);
				initPopup('.popup-consultation', { message: inputQuestion.value.trim() });
			} else {
				showError(inputQuestion);
			}
		}

		if (target.classList.contains('construct-btn') &&
			target.classList.contains('call-btn')) {
			const myonoffswitch = document.getElementById('myonoffswitch').checked,
				distance = document.getElementById('distance').value.trim();
			const data = {
				typeSeptic: myonoffswitch ? 1 : 2,
				diameter: document.getElementById('diameter').value,
				numberRings: document.getElementById('numberRings').value,
				diameterTwo: myonoffswitch ? 0 : document.getElementById('diameterTwo').value,
				numberRingsTwo: myonoffswitch ? 0 : document.getElementById('numberRingsTwo').value,
				bottom: document.getElementById('myonoffswitch-two').value,
				distance: distance ? distance : 0,
				calcResult: document.getElementById('calc-result').value
			}

			initPopup('.popup-discount', data);
		}
	});
};

export default togglePopUp;
