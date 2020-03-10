
const calc = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquary = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');
	let interval;

	const animatedCalc = options => {
		const duration = options.duration || 5000,
			total = options.total || 0,
			difference = total - totalValue.textContent,
			step = (total - totalValue.textContent) / duration;
		const start = new Date();

		const insertTotalValue = value => totalValue.textContent = value;

		const animated = () => {
			const newValue = Math.round(difference > 0 ?
				Math.min(+totalValue.textContent + (new Date() - start) * step, total) :
				Math.max(+totalValue.textContent + (new Date() - start) * step, total));

			insertTotalValue(newValue);

			if (newValue !== total)
				interval = requestAnimationFrame(animated);
		};

		cancelAnimationFrame(interval);
		interval = requestAnimationFrame(animated);
	};

	const countSum = () => {
		let total = 0,
			counrValue = 1,
			dayValue = 10;
		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquary.value;

		if (calcCount.value > 1) {
			counrValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value) {
			if (calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value < 10) {
				dayValue *= 1.5;
			}
		}

		if (!!typeValue && !!squareValue) {
			total = price * typeValue * squareValue * counrValue * dayValue;
			animatedCalc({ total });
		}
	};

	calcBlock.addEventListener('change', event => {
		const target = event.target;

		if (target.matches('.calc-day') || target.matches('.calc-type') ||
			target.matches('.calc-square') || target.matches('.calc-count')) {
			countSum();
		}
	});

	calcBlock.addEventListener('input', () => {
		if (event.target.type === 'number') {
			event.target.value = event.target.value.replace(/\D/g, '');
		}
	});
};

export default calc;
