
const initPopup = (classPopup) => {
	const popup = document.querySelector(classPopup);

	const showPopup = elem => elem.style.display = 'block';

	const slearInputs = elem => {
		const inputs = elem.querySelectorAll('input');

		inputs.forEach(item => {
			if (item.type !== 'button') item.value = '';
		});
	};

	const closePopup = elem => {
		elem.style.display = 'none';

		slearInputs(elem);
	};

	showPopup(popup);

	popup.addEventListener('click', event => {
		let target = event.target;

		if (target.classList.contains('popup-close')) {
			event.preventDefault();
			closePopup(popup);
		} else {
			target = target.closest('.popup-content');

			if (!target) {
				closePopup(popup);
			}
		}
	});
};

export default initPopup;
