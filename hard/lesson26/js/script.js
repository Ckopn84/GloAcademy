'use strict';

/*

    Задания по уроку №26

*/

document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById('input'),
		output = document.getElementById('output'),
		langInput = document.getElementById('lang-input'),
		langOutput = document.getElementById('lang-output'),
		// hint = 'hint=ru,en,uk,be,de',
		key = 'key=trnsl.1.1.20200307T061707Z.8310b70b1d438a2a.df290f9c12d18ba3de02132843fea4c03204ca9b';

	const sendRequest = (url, str = '') => fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: str,
	});

	const textTranslation = text => {
		const lang = langInput.value + '-' + langOutput.value;
		const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?' + key +
			'&text=' + encodeURIComponent(text) +
			'&lang=' + lang +
			'&format=html';

		sendRequest(url)
			.then(response => {
				if (response.status !== 200)
					throw new Error(`Status network ${response.status} (${response.statusText})`);
					// console.error(new Error(`Status network ${response.status} (${response.statusText})`));
				return response.clone().json();
			})
			.then(data => {
				if (data.code !== 200)
					throw new Error(`Yandex response: ${data.message} (${data.code})`);

				output.innerHTML = data.text;
			})
			.catch(error => console.error(error));
	};

	const getOutputLanguage = lang => {
		const url = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=ru&' + key;

		sendRequest(url)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(`Status network ${response.status} (${response.statusText})`);
				}
				return response.clone().json();
			})
			.then(data => {
				const outLangs = data.dirs.filter(item => item.split('-')[0] === lang).map(item => item.split('-')[1]);
				const langOut = !langOutput.value && lang === 'ru' ? 'en' :
					langInput.value === langOutput.value &&
						lang !== langInput.value &&
						outLangs.includes(langInput.value) ? langInput.value :
						outLangs.includes(langOutput.value) && lang !== langOutput.value ? langOutput.value :
							outLangs.includes('ru') ? 'ru' :
								outLangs.includes('en') ? 'en' : outLangs[0];

				Object.keys(data.langs).filter(item => outLangs.includes(item)).forEach(key => {
					const option = document.createElement('option');

					option.value = key;
					option.textContent = data.langs[key];
					if (key === langOut) option.selected = true;

					langOutput.appendChild(option);
					if (input.value.trim() !== '') textTranslation(input.value.trim());
				});
			})
			.catch(error => console.error(error));
	};

	const getInputLanguage = lang => {
		const url = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=ru&' + key;

		sendRequest(url)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(`Status network ${response.status} (${response.statusText})`);
				}
				return response.clone().json();
			})
			.then(data => {
				Object.keys(data.langs).forEach(key => {
					const option = document.createElement('option');

					option.value = key;
					option.textContent = data.langs[key];
					if (key === lang) option.selected = true;

					langInput.appendChild(option);
				});
				getOutputLanguage(lang);
			})
			.catch(error => console.error(error));
	};

	const langDefinition = text => {
		const url = 'https://translate.yandex.net/api/v1.5/tr.json/detect?' +
			// '?' + key + '&' + hint + '&text=' + encodeURIComponent(text);
			key + '&text=' + encodeURIComponent(text);

		sendRequest(url)
			.then(response => {
				if (response.status !== 200)
					throw new Error(`Status network ${response.status} (${response.statusText})`);
				return response.clone().json();
			})
			.then(data => {
				if (data.code !== 200)
					throw new Error(`Yandex response: ${data.code}`);
				for (const item of langInput.children) {
					if (item.value === data.lang) {
						item.selected = true;
					} else if (item.selected) item.selected = false;
				}
				getOutputLanguage(data.lang);
				if (input.value.trim() !== '') textTranslation(input.value.trim());
			})
			.catch(error => console.error(error));
	};

	const init = () => {
		getInputLanguage('ru');

		input.addEventListener('input', event => langDefinition(event.target.value));
		langInput.addEventListener('change', event => getOutputLanguage(event.target.value));
		langOutput.addEventListener('change', event => getOutputLanguage(event.target.value));
	};

	init();
});
