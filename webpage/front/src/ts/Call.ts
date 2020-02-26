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
	public user: string = ""
	public actions: string = ""
	//day is a string array formatted to fit "MM-DD-YYY"
	public day: string = ""
	public times: string = ""
	public event_name: string = ""
	public event_description: string = ""
	public event_id: string = ""
	//Needs to be given the name of the user
	constructor(theUser: string) {
		this.user = theUser;
	}

	uintToString(uintArray: number[]) {
		let encodedString = String.fromCharCode.apply(null, uintArray),
		decodedString = decodeURIComponent(escape(encodedString));
		return decodedString;
	}

	makeBody() {
		let body = "";
		body += "{ ";
		body += "'User':'" + this.user + "',";
		body += "'Action':'" + this.actions + "', ";
		body += "'Day' : '" + this.day + "', ";
		body += "'Times' : '" + this.times + "',";
		body += "'Event_name' : '" + this.event_name + "',";
		body += "'Event_Description' : '" + this.event_description + "',";
		body += "'Event_ID' : '" + this.event_id + "'}";
		return(body);
	}

	async standardCall(the_body: string) {
		let body_promise;
		const the_resp = fetch('http://localhost/api', {
			//mode: 'no-cors',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(the_body)
		}).then( data => {
			data.body.getReader().read().then(res => {
				body_promise = String.fromCharCode.apply(null, res.value);
				console.log(body_promise);
				//return(String.fromCharCode.apply(null, res.value));
			});
		})
	}

	getAllEvents() {
		this.actions = "Get-All-Events";
		let call_body = this.makeBody();
		this.standardCall(call_body);
	}

	getEventsAttending() {
		this.actions = "Get-Events-Attending";
		let call_body = this.makeBody();
		this.standardCall(call_body);
	}

	getEventsForDays(date:string) {
		this.day = date;
		let call_body = this.makeBody();
		this.standardCall(call_body);
	}

	getAttendees(id_of_event:string) {
		this.event_id = id_of_event;
		let call_body = this.makeBody();
		this.standardCall(call_body);
	}


	//createEvent(the_event_name: string, the_event_description: string, the_day: string[], the_time: string[]) {

//	}


	}


