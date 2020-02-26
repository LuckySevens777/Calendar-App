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
		let body = '';
		body += '{ ';
		body += '"User":"' + this.user + '",';
		body += '"Action":"' + this.actions + '", ';
		body += '"Day" : [' + this.day + '], ';
		body += '"Times" : [' + this.times + '],';
		body += '"Event_name" : "' + this.event_name + '",';
		body += '"Event_Description" : "' + this.event_description + '",';
		body += '"Event_ID" : "' + this.event_id + '"}';
		return(body);
	}

	async standardCall(the_body: any) {
		let body_promise;
		let testing = `{"User": "Drmk5","Action": "Get-All-Events","Day": [],"Times": [],"Event_Name": "","Event_Description": "","Event_ID": ""}`;
	console.log(testing);
		const the_resp = fetch('/api', {
			//mode: 'no-cors',
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Brave Chrome/80.0.3987.116 Safari/537.36'
			},
			body: testing
		}).then( data => {
			data.body.getReader().read().then(res => {
				body_promise = String.fromCharCode.apply(null, res.value);
				console.log(body_promise);
				//return(String.fromCharCode.apply(null, res.value));
			});
		})
	}

	signUp(the_name:string) {
		this.actions = "Sign-Up";
		this.user = the_name;
		let call_body = this.makeBody();
		//console.log(call_body);
		this.standardCall(JSON.parse(call_body));
	}

	getAllEvents() {
		this.actions = "Get-All-Events";
		let call_body = this.makeBody();
		this.standardCall(JSON.parse(call_body));
	}

	getEventsAttending() {
		this.actions = "Get-Events-Attending";
		let call_body = this.makeBody();
		this.standardCall(JSON.parse(call_body));
	}

	getEventsForDays(date:string) {
		this.day = date;
		let call_body = this.makeBody();
		this.standardCall(JSON.parse(call_body));
	}

	getAttendees(id_of_event:string) {
		this.event_id = id_of_event;
		let call_body = this.makeBody();
		this.standardCall(JSON.parse(call_body));
	}


	createEvent(the_event_name: string, the_event_description: string, the_day: string[], the_time: string[]) {

	}


	}


