'use strict';

/*

    Практическое занятие по уроку № 25

*/

/* Комментарии: Пример как это делали ранее */
const output = document.getElementById('output'),
	urlPhotos = 'http://jsonplaceholder.typicode.com/photos';

/* const getData = (url, outputData) => {
	const request = new XMLHttpRequest();

	request.open('GET', url);
	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) {
			return;
		}
		if (request.status === 200) {
			const response = JSON.parse(request.responseText);
			outputData(response);
		} else {
			console.error(request.statusText);
		}
	});

	request.send();
}; */

const getData = url => new Promise((resolve, reject) => {
	const request = new XMLHttpRequest();

	request.open('GET', url);
	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200) {
			const response = JSON.parse(request.responseText);

			resolve(response);
		} else {
			reject(request.statusText);
		}
	});

	request.send();
});

/* const outputPhotos = data => {
	const random = Math.floor(Math.random() * data.length);
	const obj = data[random];

	output.innerHTML = `<h4>${obj.title}</h4>
		<img src="${obj.thumbnailUrl}" alt="${obj.title}">`;
};
 */
/* const outputPhotos = objUrl => {
	output.insertAdjacentHTML('beforebegin',
		`<h4>${objUrl.title}</h4>
		<img src="${objUrl.thumbnailUrl}" alt="${objUrl.title}">`);
}; */

const outputPhotos = data => {
	data.forEach(item => {
		output.insertAdjacentHTML('beforebegin',
			`<h4>${item.title}</h4>
			<img src="${item.thumbnailUrl}" alt="${item.title}">`);
	});
};

// getData(urlPhotos, outputPhotos);

const oneImg = getData(urlPhotos + '/1'),
	twoImg = getData(urlPhotos + '/2');

/* oneImg
	.then(outputPhotos)
	.catch(error => console.error(error));

twoImg
	.then(outputPhotos)
	.catch(error => console.error(error)); */

Promise.all([oneImg, twoImg])
	.then(outputPhotos)
	.catch(error => console.error(error));

/* Promise.race([oneImg, twoImg]) // отработает только для первого, выполнившегося
	.then(outputPhotos)
	.catch(error => console.error(error)); */


/* getData(urlPhotos)
	.then(outputPhotos)
	.catch(error => console.error(error));
 */
