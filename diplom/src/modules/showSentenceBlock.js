
const showSentenceBlock = () => {
	const sentenceRow = document.querySelector('.sentence .row'),
		addSentenceBtn = document.querySelector('.add-sentence-btn');

	addSentenceBtn.addEventListener('click', () => {
		for (const elem of sentenceRow.children) {
			if (elem.classList.contains('visible-sm-block'))
				elem.classList.remove('visible-sm-block');
			if (elem.classList.contains('hidden'))
				elem.classList.remove('hidden');
			addSentenceBtn.style.display = 'none';
		}
	});
};

export default showSentenceBlock;
