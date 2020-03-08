// eslint-disable-next-line strict
const checkCalcBlock = () => {
	const calcBlock = document.querySelector('.calc-block');

	calcBlock.addEventListener('input', () => {
		if (event.target.type === 'number') {
			event.target.value = event.target.value.replace(/\D/g, '');
		}
	});
};

export default checkCalcBlock;
