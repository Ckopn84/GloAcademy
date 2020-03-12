'use strict';

document.addEventListener('DOMContentLoaded', () => {
	//
	const togglePopUp = () => {
		const showPopup = elem => elem.style.display = 'block';

		const closePopup = elem => elem.style.display = 'none';

		const initPopup = classPopup => {
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

		document.body.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (target.closest('.contacts') && target.classList.contains('call-btn')) initPopup('.popup-call');
		});
	};
	togglePopUp();
});
