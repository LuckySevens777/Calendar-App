export async function call(the_url) {
	const rawResponse = await fetch(the_url, {
		method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"Action" : "boop"})
	})
	const content = await rawResponse.json();
	console.log(content);
}
