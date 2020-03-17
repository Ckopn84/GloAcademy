
const calc = () => {
	const dataTank = {
			cost: [10000, 15000],
			diameter: {
				'1.4': [0, 0],
				'2': [0.2, 0.2]
			},
			numberRings: {
				1: [0, 0],
				2: [0.3, 0.3],
				3: [0.5, 0.5]
			},
			bottom: [1000, 2000]
		},
		constructor = document.getElementById('accordion'),
		diameter = document.getElementById('diameter'),
		numberRings = document.getElementById('numberRings'),
		diameterTwo = document.getElementById('diameterTwo'),
		numberRingsTwo = document.getElementById('numberRingsTwo'),
		calcResult = document.getElementById('calc-result'),
		myonoffswitch = document.getElementById('myonoffswitch'),
		myonoffswitchTwo = document.getElementById('myonoffswitch-two');

	const calculatingCost = () => {
		const installation = dataTank.cost[+!myonoffswitch.checked];

		return installation +
			installation * dataTank.diameter[diameter.value][0] +
			installation * dataTank.numberRings[numberRings.value][0] +
			installation * dataTank.diameter[diameterTwo.value][1] * !myonoffswitch.checked +
			installation * dataTank.numberRings[numberRingsTwo.value][1] * !myonoffswitch.checked +
			dataTank.bottom[+!myonoffswitch.checked] * myonoffswitchTwo.checked;
	};

	const showResult = () => calcResult.value = calculatingCost();

	const handleEvents = event => {
		const target = event.target;

		if (target.classList.contains('onoffswitch-inner') ||
		target.classList.contains('onoffswitch-switch')) {
			event.preventDefault();
			target.parentElement.previousElementSibling.checked = !target.parentElement.previousElementSibling.checked;

			if (target.parentElement.previousElementSibling.id === 'myonoffswitch')
				if (target.parentElement.previousElementSibling.checked) {
					document.getElementById('twoTank').style.display = 'none';
				} else {
					document.getElementById('twoTank').style.display = 'block';
				}
		}

		showResult();
	};

	constructor.addEventListener('click', event => {
		handleEvents(event);
	});
	
	/* constructor.addEventListener('change', event => {
		handleEvents(event.target);
	}); */
};

export default calc;
