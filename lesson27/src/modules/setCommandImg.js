// eslint-disable-next-line strict
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

export default setCommandImg;
