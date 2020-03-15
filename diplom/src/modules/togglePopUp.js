
import { dataCalc, dataQuestion } from './dataForms';
import initPopup from './initPopup'

const togglePopUp = () => {
	const showError = elem => elem.style.cssText = 'border: 2px solid red; ';

	const removeError = elem => elem.style.cssText = '';

	document.body.addEventListener('click', event => {
		const target = event.target;

		if (target.type !== 'submit') event.preventDefault();

		if (target.closest('.contacts') && target.classList.contains('call-btn')) initPopup('.popup-call');

		if (target.classList.contains('discount-btn')) initPopup('.popup-discount');

		if (target.classList.contains('check-btn')) initPopup('.popup-check');

		if (target.classList.contains('consultation-btn')) {
			const inputQuestion = document.querySelector('.director-form input');

			if (inputQuestion.value.trim()) {
				removeError(inputQuestion);
				dataQuestion.message = inputQuestion.value.trim();
				initPopup('.popup-consultation');
				return false;
			} else showError(inputQuestion);
		}

		if (target.classList.contains('construct-btn') &&
			target.classList.contains('call-btn')) {
			const myonoffswitch = document.getElementById('myonoffswitch').checked,
				distance = document.getElementById('distance').value.trim();

			dataCalc.send = true;
			dataCalc.typeSeptic = myonoffswitch ? 1 : 2;
			dataCalc.diameter = document.getElementById('diameter').value;
			dataCalc.numberRings = document.getElementById('numberRings').value;
			dataCalc.diameterTwo = myonoffswitch ? 0 : document.getElementById('diameterTwo').value;
			dataCalc.numberRingsTwo = myonoffswitch ? 0 : document.getElementById('numberRingsTwo').value;
			dataCalc.bottom = document.getElementById('myonoffswitch-two').value;
			dataCalc.distance = distance ? distance : 0;
			dataCalc.calcResult = document.getElementById('calc-result').value;

			initPopup('.popup-discount');
		}
	});
};

export default togglePopUp;
