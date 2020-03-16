
const chackValidName = elem => elem.value = elem.value.replace(/[^а-яё ]/gi, '');

const chackValidMessage = elem => elem.value = elem.value.replace(/[^а-яё ,.!?():;+-\d]/gi, '');

const chackValidNumber = elem => elem.value = elem.value.replace(/[^\d]/g, '');

const chackValidPhone = event => {
	const keyCode = event.keyCode;
	const target = event.target;

	const template = '+7 (___) ___-__-__',
		def = template.replace(/\D/g, ''),
		val = target.value.replace(/\D/g, '');
	let i = 0,
		newValue = template.replace(/[_\d]/g, a => i < val.length ? val.charAt(i++) || def.charAt(i) : a);

	i = newValue.indexOf('_');

	if (i != -1) {
		newValue = newValue.slice(0, i);
	}

	let reg = template
		.substr(0, target.value.length)
		.replace(/_+/g, a => { return '\\d{1,' + a.length + '}'; })
		.replace(/[+()]/g, '\\$&');

	reg = new RegExp('^' + reg + '$');

	if (!reg.test(target.value) || target.value.length < 5 || keyCode > 47 && keyCode < 58) {
		target.value = newValue;
	}
	if (event.type == "blur" && target.value.length < 5) {
		target.value = "";
	}
};

const validation = () => {
	const inputs = document.querySelectorAll('.phone-user');

	document.body.addEventListener('input', event => {
		const target = event.target;

		if (target.name === 'user_name') {
			chackValidName(target);
		} else if (target.name === 'user_quest') {
			chackValidMessage(target);
		} else if (target.name === 'distance') {
			chackValidNumber(target);
		}
	});

	inputs.forEach(item => {
		item.addEventListener('input', chackValidPhone);
		item.addEventListener('focus', chackValidPhone);
		item.addEventListener('blur', chackValidPhone);
	});
};

export default validation;
