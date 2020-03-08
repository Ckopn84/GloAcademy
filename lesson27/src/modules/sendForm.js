// eslint-disable-next-line strict
const sendForm = () => {
	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	const clearInput = form => {
		[...form.elements]
			.filter(item =>
				item.tagName.toLowerCase() !== 'button' &&
				item.type !== 'button')
			.forEach(item =>
				item.value = '');
	};

	const isValid = event => {
		const target = event.target;

		if (target.matches('.form-phone')) {
			target.value = target.value.replace(/[^+\d]/g, '');
		}

		if (target.name === 'user_name') {
			target.value = target.value.replace(/[^а-яё ]/gi, '');
		}

		if (target.matches('.mess')) {
			target.value = target.value.replace(/[^а-яё ,.]/gi, '');
		}
	};

	const processingForm = form => {
		const statusMessage = document.createElement('div');

		const showStatus = status => {
			const img = document.createElement('img');
			const statusList = {
				load: {
					message: ' Загрузка...',
					img: './images/message/waiting.gif'
				},
				error: {
					message: ' Что-то пошло не так...',
					img: './images/message/Err.png'
				},
				success: {
					message: ' Спасибо! Мы скоро с вами свяжемся!',
					img: './images/message/OK.png'
				}
			};

			statusMessage.textContent = statusList[status].message;
			img.src = statusList[status].img;
			img.height = 50;

			statusMessage.insertBefore(img, statusMessage.firstChild);
		};

		statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

		form.addEventListener('submit', event => {
			event.preventDefault();

			showStatus('load');

			form.appendChild(statusMessage);

			postData(Object.fromEntries(new FormData(form)))
				.then(response => {
					if (response.status !== 200) throw new Error(`Status network ${request.status}`);

					showStatus('success');
					clearInput(form);
				})
				.catch(error => {
					showStatus('error');

					console.error(error);
				});
		});

		form.addEventListener('input', isValid);
	};

	document.querySelectorAll('form').forEach(elem => processingForm(elem));
};

export default sendForm;
