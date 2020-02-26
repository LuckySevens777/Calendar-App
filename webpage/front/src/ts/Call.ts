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
		//let body = `{"User": "$(this.user)", "Action": "$(this.actions)", "Day": "$(this.day)", "Times": "$(this.times)", "Event_Name" : "$(this.event_name)", "Event_Description": "$(this.event_description)", "Event_ID": "$(this.event_id)"}`
		//let body = `{"User": "` + this.user + `", "Action": "` + this.actions + `", "Day": "` + this.day + `", "Times": "` + this.times + `", "Event_Name" : "` + this.event_name + `", "Event_Description" : "` + this.event_description + `", "Event_ID" : "` + this.event_id + `"}`;
		let body = {
			User : this.user,
			Action : this.actions,
			Day : this.day,
			Times : this.times,
			Event_Name : this.event_name,
			Event_Description : this.event_description,
			Event_ID : this.event_id
		}
		console.log(body);
		console.log(JSON.stringify(body));
		return(body);
		
	}

	async standardCall(the_body: any) {
		//the_body has to by a string like the one below. Make it look like this, don't want to touch it too much
		let testing = `{"User": "Drmk5","Action": "Get-All-Events","Day": [],"Times": [],"Event_Name": "","Event_Description": "","Event_ID": ""}`;
		console.log(typeof(testing));
		let body_promise;
		const the_resp = fetch('/api', {
			//mode: 'no-cors',
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
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

	/**
	 * Add user to an event
	 * @param the_name the name of the event to join
	 */
	signUp(the_name:string) {
		this.actions = "Sign-Up";
		this.user = the_name;
		let call_body = this.makeBody();
		console.log('HELLO THERE');
		console.log(call_body);
		this.standardCall(call_body);
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


	/**
	 * Sends an API call to create an event
	 * @param the_event_name duh
	 * @param the_event_description also, duh
	 * @param the_day the date formatted as ["YYYY", "MM", "DD"]
	 * @param time_slots the array of time slot numbers to be created
	 */
	createEvent(the_event_name: string, the_event_description: string, the_day: string[], time_slots: number[]) : void {

	}


}


