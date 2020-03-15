
const sendForm = () => {
	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	document.addEventListener('submit', event => {
		console.log(event);
		event.preventDefault();

	});
};

export default sendForm;