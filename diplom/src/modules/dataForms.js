
export const dataCalc = {
	send: false,
	typeSeptic: 1,
	diameter: '1.4',
	numberRings: 1,
	diameterTwo: 0,
	numberRingsTwo: 0,
	bottom: true,
	distance: 0,
	calcResult: 11000,
	clear() {
		this.send = false;
		this.typeSeptic = 1;
		this.diameter = '1.4';
		this.numberRings = 1;
		this.diameterTwo = 0;
		this.numberRingsTwo = 0;
		this.bottom = true;
		this.distance = 0;
		this.calcResult = 11000;
	}
};

export const dataQuestion = {
	message: ''
};
