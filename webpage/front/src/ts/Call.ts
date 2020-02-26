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
		const the_resp = await fetch('/api', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
			},
			body: the_body
		})
		let the_text = await the_resp.body.getReader().read();
		return(String.fromCharCode.apply(null, the_text.value));
	}

	/**
	 * Add user to an event
	 * @param the_name the name of the event to join
	 */
	async signUp() {
		this.actions = "Sign-Up";
		let call_body = this.makeBody();
		let return_str = await this.standardCall(call_body);
		console.log(return_str);
	}

	async async_getAllEvents() {
		this.actions = "Get-All-Events";
		let call_body = this.makeBody();
		let return_str = await this.standardCall(call_body);
		return(return_str);
	}

	getAllEvents() : Event[] {
		let json_string = this.async_getAllEvents();

		return []
	}

	async getEventsAttending() {
		this.actions = "Get-Events-Attending";
		let call_body = this.makeBody();
		let return_str = await this.standardCall(call_body);
	}

	//can connect to backend but dunno if it gets the events
	async getEventsForDays(date:string[]) {
		this.actions = "Get-Events-For-Days";
		this.day = String(date);
		let call_body = this.makeBody();
		let return_str = await this.standardCall(call_body);
	}

	async getAttendees(id_of_event:string) {
		this.actions = "Get-Attendees";
		this.event_id = id_of_event;
		let call_body = this.makeBody();
		let return_str = await this.standardCall(call_body);
		let the_json = JSON.parse(return_str);
		return(the_json.Attendee_Names);
	}


	/**
	 * Sends an API call to create an event
	 * @param the_event_name duh
	 * @param the_event_description also, duh
	 * @param the_day the date formatted as ["YYYY", "MM", "DD"]
	 * @param time_slots the array of time slot numbers to be created
	 */
	public async createEvent(the_event_name: string, the_event_description: string, the_day: string, time_slots: string[]) {
		this.actions = "Create-Event";
		this.event_name = the_event_name;
		this.event_description = the_event_description;
		this.day = the_day;
		this.times = String(time_slots);
		let call_body = this.makeBody();
		console.log('asdfjka;lsdkfj');
		return await this.standardCall(call_body);
	}

	/**
	 * Sends a log in request to the API
	 */
	public async login() : Promise<void> {
		this.actions = "Sign-In";
		let call_body = this.makeBody();
		return await this.standardCall(call_body);
	}

	/**
	 * sends a log out request to the API
	 */
	public logout() : void {

	}

	public joinEvent(username:string, eventName:string, times:number[]) : void {

	}

}


