
import { dataCalc, dataQuestion } from './dataForms';

const closePopup = elem => {
	const clearInputs = elem => {
		const inputs = elem.querySelectorAll('input');

		inputs.forEach(item => {
			if (item.type !== 'button') item.value = '';
		});
	};

	const clearData = () => {
		if (Object.keys(dataCalc).indexOf('send') < 0) dataCalc.clear();
		dataQuestion.message = '';
	};

	elem.style.display = 'none';

	clearInputs(elem);
	clearData();
};

export default closePopup;
