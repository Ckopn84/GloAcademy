
const toggleAccordion = () => {
	const handlingPanel = idElem => {
		const elem = document.querySelector(idElem),
			accordion = elem.closest('.panel-group'),
			parent = elem.closest('.panel-default');

		const togglePanel = (elem, option = '') => {
			if (!!option) {
				if (!elem.children[1].classList.contains('in'))
					elem.children[1].classList.add('in');
			} else if (elem.children[1].classList.contains('in'))
				elem.children[1].classList.remove('in');
		};

		for (const item of accordion.children) {
			if (item === parent) {
				togglePanel(item, 'in');
			} else {
				togglePanel(item);
			}
		}
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

			handlingPanel(hash);
		}
	});
};

export default toggleAccordion;
