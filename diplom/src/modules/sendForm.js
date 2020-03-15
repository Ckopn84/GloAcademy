
import { dataCalc, dataQuestion } from './dataForms';
import initPopup from './initPopup';
import closePopup from './closePopup';

const sendForm = () => {
	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	document.addEventListener('submit', event => {
		event.preventDefault();

		const target = event.target;

		const showStatus = status => {
			const statusList = {
				error: {
					message: 'Приносим извинения!<br />При отправке Вашего сообщения возникла ошибка.<br />' +
						'Попробуйте позже или позвоните нам.',
					img: './img/status/cancel.svg'
				},
				success: {
					message: 'Спасибо!<br />Мы скоро с вами свяжемся!',
					img: './img/status/mark.svg'
				}
			};
			const img = document.getElementById('imgStatus'),
				paragraph = document.getElementById('pStatus');

			if (Object.keys(statusList).indexOf(status) >= 0) {
				img.src = statusList[status].img;
				paragraph.innerHTML = statusList[status].message;

				initPopup('.popup-status');
			}
		};

		const chackData = () => {
			if (dataCalc.send) {
				delete dataCalc.send;
				return dataCalc;
			}

			if (dataQuestion.message !== '') return dataQuestion;

			return {};
		};

		if (!target.classList.contains('director-form')) {
			const data = chackData(),
				formData = new FormData(target);

			formData.forEach((val, key) => data[key] = val);

			showStatus('load');
			postData(data)
				.then(response => {
					if (response.status !== 200) throw new Error(`Status network ${response.status}`);
					showStatus('success');
					return response.json();
				})
				.then(data => {
					// обработка ответа
					// console.log(data);
				})
				.catch(error => {
					showStatus('error');
					console.error(error);
				});

			if (target.closest('.popup')) closePopup(target.closest('.popup'));
		}

	});
};

export default sendForm;