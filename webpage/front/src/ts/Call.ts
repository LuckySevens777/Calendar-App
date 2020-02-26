export async function call(the_url) {
	const rawResponse = fetch(the_url, {
		method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"Action" : "boop"})
	}).then(data => ({
		        data: data,
	})
				 ).then(res => { console.log(res) });
	//const content = await rawResponse.json();
	//console.log(content);
}


export class ApiCall {
	public user: string
	public action: string
	//day is a string array formatted to fit "MM-DD-YYY"
	public day: string[]
	public times: string[]
	public event_name: string
	public event_description: string
	public event_id: number
	//Needs to be given the name of the user
	constructor(theUser: string) {
		this.user = theUser;
	}

	standardCall(the_body: string) {
		let body_promise;
		const the_resp = fetch('/api/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(the_body)
		}).then( data => {
			body_promise = data.body.getReader().read();
			body_promise.then(res => {
				console.log(String.fromCharCode.apply(null, res.value));
				console.log(res.value);
			});
		})
	}


	}


	//createEvent(the_event_name: string, the_event_description: string, the_day: string[], the_time: string[]) {






//}
