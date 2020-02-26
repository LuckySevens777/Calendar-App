import {Event} from './Event'
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
		let body = {
			User : this.user,
			Action : this.actions,
			Day : this.day,
			Times : this.times,
			Event_Name : this.event_name,
			Event_Description : this.event_description,
			Event_ID : this.event_id
		}
		return(JSON.stringify(body));
	}

	async standardCall(the_body: any) {
		//the_body has to by a string like the one below. Make it look like this, don't want to touch it too much
		//let testing = `{"User": "Drmk5","Action": "Get-All-Events","Day": [],"Times": [],"Event_Name": "","Event_Description": "","Event_ID": ""}`;
		let body_promise;
		const the_resp = fetch('/api', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
			},
			body: the_body
		}).then( data => {
			data.body.getReader().read().then(res => {
				body_promise = String.fromCharCode.apply(null, res.value);
			});
		})
		let result = await the_resp;
		return(result);
	}

	/**
	 * Add user to an event
	 * @param the_name the name of the event to join
	 */
	async signUp() {
		this.actions = "Sign-Up";
		console.log("Entered sign up");
		let call_body = this.makeBody();
		console.log("made call body");
		let return_str = await this.standardCall(call_body);
		console.log(return_str);
		console.log('asl;dfkjas;ldfkj');
	}

	getAllEvents() : Event[] {
		this.actions = "Get-All-Events";
		let call_body = this.makeBody();
		this.standardCall(call_body);

		return []
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
	public createEvent(the_event_name: string, the_event_description: string, the_day: string[], time_slots: number[]) : void {

	}

	/**
	 * Sends a log in request to the API
	 */
	public login() : void {

	}

	/**
	 * sends a log out request to the API
	 */
	public logout() : void {

	}

}


