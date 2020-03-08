// eslint-disable-next-line strict
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

export default togglePopUp;
