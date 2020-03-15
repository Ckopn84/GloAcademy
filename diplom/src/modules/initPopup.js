
import closePopup from './closePopup';

const initPopup = (classPopup) => {
	const popup = document.querySelector(classPopup);

	const showPopup = elem => elem.style.display = 'block';

	showPopup(popup);

	popup.addEventListener('click', event => {
		let target = event.target;

		if (target.classList.contains('popup-close') ||
			target.classList.contains('close-popup')) {
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
