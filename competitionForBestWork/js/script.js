'use strict';

/*

    Задания на КОНКУРС ЛУЧШИХ РАБОТ

1) Загрузить JSON файл
2) При помощи ajax запросов к загруженному файлу сформировать на странице карточки
Героев со всеми данными (фото, имя, настоящее имя,  список фильмов, статус).
1 персонаж - 1 карточка.
3) Реализовать переключатели-фильтры по фильмам.
Выпадающее меню или список, на ваше усмотрение
Показывать только те карточки, которые подходят под выбранный фильтр.
Стилизация карточек и всего внешнего вида - на ваше усмотрение.
Упор сделать на главную цель - донесение информации, никаких вырвиглазных цветов и шрифтов.
4) Добавить ссылку на выполненное задание
Оцениваться будет в основном чистота кода и правильность реализации.
В случае идеального кода у претендентов - будем смотреть на стили.
*/

document.addEventListener('DOMContentLoaded', () => {
	const section = document.querySelector('section'),
		filter = document.getElementById('filter'),
		db = './db/dbHeroes.json';

	let newHeroes = {};

	const addMovies = () => {
		const allMovies = [];

		newHeroes.forEach(hero => hero.movies.forEach(movie => {
			if (allMovies.indexOf(movie) < 0) allMovies.push(movie);
		}));

		allMovies.sort().forEach(movie => {
			const option = document.createElement('option');

			option.value = option.textContent = movie;
			filter.appendChild(option);
		});
	};

	class Hero {
		constructor(elem) {
			this.name = elem.name ? elem.name : '';
			this.realName = elem.realName ? elem.realName : 'no data';
			this.species = elem.species ? elem.species : 'no data';
			this.citizenship = elem.citizenship ? elem.citizenship : 'no data';
			this.genger = elem.genger ? elem.genger : 'no data';
			this.birthDay = elem.birthDay ? elem.birthDay : 'no data';
			this.deathDay = elem.deathDay ? elem.deathDay : 'no data';
			this.status = elem.status ? elem.status : 'no data';
			this.actors = elem.actors ? elem.actors : 'no data';
			this.photo = elem.photo ? elem.photo : 'no data';
			this.movies = elem.movies ? elem.movies.map(movie => movie.trim()) : [];
		}

		newCard() {
			const photo = document.createElement('img'),
				card = document.createElement('hero'),
				name = document.createElement('h2'),
				cardData = document.createElement('div'),
				data = document.createElement('div'),
				realName = document.createElement('p'),
				species = document.createElement('p'),
				citizenship = document.createElement('p'),
				genger = document.createElement('p'),
				birthDay = document.createElement('p'),
				deathDay = document.createElement('p'),
				status = document.createElement('p'),
				actors = document.createElement('p'),
				moviesAbout = document.createElement('p'),
				movies = document.createElement('ul');

			name.textContent = this.name;
			realName.innerHTML = `<b>Real Name:</b> ${this.realName}`;
			photo.src = this.photo;
			species.innerHTML = `<b>Species:</b> ${this.species}`;
			citizenship.innerHTML = `<b>Citizenship:</b> ${this.citizenship}`;
			genger.innerHTML = `<b>Genger:</b> ${this.genger}`;
			birthDay.innerHTML = `<b>Birth Day:</b> ${this.birthDay}`;
			deathDay.innerHTML = `<b>Death Day:</b> ${this.deathDay}`;
			status.innerHTML = `<b>Status:</b> ${this.status}`;
			actors.innerHTML = `<b>Actors:</b> ${this.actors}`;

			cardData.style.cssText = `display: flex; `;
			data.style.cssText = `display: block; `;
			photo.style.cssText = `height: 300px; float: left; padding: 0 20px 20px 0; `;

			data.appendChild(realName);
			data.appendChild(species);
			data.appendChild(citizenship);
			data.appendChild(genger);
			data.appendChild(birthDay);
			data.appendChild(deathDay);
			data.appendChild(status);
			data.appendChild(actors);
			cardData.appendChild(photo);
			cardData.appendChild(data);
			card.appendChild(name);
			card.appendChild(cardData);

			if (this.movies.length > 0) {
				moviesAbout.innerHTML = '<b>Movies:</b> ';
				this.movies.forEach(elem => {
					const listItem = document.createElement('li');
					listItem.textContent = elem;
					movies.appendChild(listItem);
				});
				data.appendChild(moviesAbout);
				data.appendChild(movies);
			}

			return card;
		}

		checkMovie(filter = '') {
			return filter === '' ? true : this.movies.filter(movie => movie === filter).length > 0;
		}
	}

	const getHeroes = callback => {
		const request = new XMLHttpRequest();

		request.open('GET', db);

		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) return;
			if (request.status === 200) {
				callback(JSON.parse(request.responseText));
			} else {
				new Error(request.statusText);
			}
		});

		request.send();
	};

	getHeroes(heroes => {
		newHeroes = heroes.map(item => new Hero(item));
		newHeroes.filter(hero => hero.checkMovie()).forEach(hero => section.appendChild(hero.newCard()));
		addMovies();
	});

	filter.addEventListener('change', () => {
		section.textContent = '';
		newHeroes
			.filter(hero => hero.checkMovie(event.target.value))
			.forEach(hero => section.appendChild(hero.newCard()));
	});
});
