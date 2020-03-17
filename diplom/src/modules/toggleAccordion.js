
import animation from './animationAccordion';

const toggleAccordion = () => {
	const handlingPanel = idElem => {
		const elem = document.querySelector(idElem),
			accordion = elem.closest('.panel-group'),
			parent = elem.closest('.panel-default'),
			elems = {};

		for (const item of accordion.children) {
			if (item === parent) {
				if (!item.children[1].classList.contains('in')) elems['show'] = item.children[1];
			} else {
				if (item.children[1].classList.contains('in')) elems['hide'] = item.children[1];
			}
		}

		if (Object.keys(elems).length > 0) animation(elems);
	};

	document.body.addEventListener('click', event => {
		let target = event.target;

		if ((target.closest('#accordion') || target.closest('#accordion-two')) &&
			(target.closest('.panel-heading') ||
				target.tagName.toLowerCase() === 'a' ||
				target.parentElement.tagName.toLowerCase() === 'a')) {
			const hash = target.closest('[href^="#"]') ?
				target.closest('[href^="#"]').href.replace(/[^#]+(.*)/, '$1') :
				target.querySelector('a').href.replace(/[^#]+(.*)/, '$1');

			event.preventDefault();

			handlingPanel(hash);
		}
	});
};

export default toggleAccordion;
