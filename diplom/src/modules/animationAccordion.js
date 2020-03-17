
const animation = (elems) => {
	let stepHide = 0,
		stepShow = 0,
		heightShow = 0,
		heightHide = 0;
	const start = new Date(),
		duration = 300;

	const endAnimate = () => {
		elems.show.style.cssText = '';
		elems.hide.style.cssText = '';
		elems.hide.classList.remove('in');
	};

	const animate = () => {
		const progress = new Date() - start;
		const scale = progress / duration;

		elems.show.style.height = Math.min(progress * stepShow, heightShow) + 'px';
		elems.hide.style.height = Math.max(heightHide - progress * stepHide, 0) + 'px';
		elems.show.style.transform = `scaleY(${scale}) `;
		elems.hide.style.transform = `scaleY(${1 - scale}) `;

		if (parseInt(elems.show.style.height) !== heightShow && parseInt(elems.hide.style.height) !== 0) {
			requestAnimationFrame(animate);
		} else {
			endAnimate();
		}
	};

	const init = () => {
		elems.show.classList.add('in');
		heightShow = elems.show.offsetHeight;
		heightHide = elems.hide.offsetHeight;
		stepShow = heightShow / duration;
		stepHide = elems.hide.offsetHeight / duration;
		elems.show.style.transform = `scaleY(0) `;
		elems.hide.style.transform = `scaleY(1) `;
		requestAnimationFrame(animate);
	};

	init();
};

export default animation;