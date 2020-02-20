export const apiCall = async () => {
	let response = await fetch('/api', {
	method: 'POST',
	body: 'hello there',
	headers: {
      'Content-Type': 'application/json'
	}	
	});
	const myJson = await response.json();
	return myJson;
}
