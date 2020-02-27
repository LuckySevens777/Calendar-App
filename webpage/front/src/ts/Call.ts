import {Event} from './Event'
import {EVENTS} from './Event'

export class ApiCall {
	public user: string = ""
	public actions: string = ""
	//day is a string array formatted to fit "MM-DD-YYY"
	public day: string = ""
	public times: string[] = []
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

	private slots2timeString(slots:number[]) : string[]{
		const map = ["01:00", "01:20", "01:40", "02:00", "02:20", "02:40", "03:00", "03:20", "03:40", "04:00", "04:20", "04:40", "05:00", "05:20", "05:40", "06:00", "06:20", "06:40", "07:00", "07:20", "07:40", "08:00", "08:20", "08:40", "09:00", "09:20", "09:40", "10:00", "10:20", "10:40", "11:00", "11:20", "11:40", "12:00", "12:20", "12:40", "13:00", "13:20", "13:40", "14:00", "14:20", "14:40", "15:00", "15:20", "15:40", "16:00", "16:20", "16:40", "17:00", "17:20", "17:40", "18:00", "18:20", "18:40", "19:00", "19:20", "19:40", "20:00", "20:20", "20:40", "21:00", "21:20", "21:40", "22:00", "22:20", "22:40", "23:00", "23:20", "23:40", "00:00", "00:20", "00:40"]
		//return '[' + slots.map(slot => map[slot-1]).join(',') + ']'
		console.log("----------")
		console.log(slots)
		let arr = []
		for (let elem of slots) arr.push(map[elem])
		//for(let elem in map) {
		//	if(elem in slots) {
			//	console.log("Got a match", elem)
			//	arr.push(map[elem])
		//	}
		//}
	console.log("----------")
	return(arr);
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
		console.log(return_str);
		for (let elem of JSON.parse(return_str).Event_Info) EVENTS.push(elem);
		return(return_str);
	}

	getAllEvents() : Event[] {
		let thing;
		let json_string = this.async_getAllEvents();
		json_string.then(val => {
		let event = JSON.parse(val);

		thing = event.Event_Info;

		for (let elem of thing) EVENTS.push(elem);
		});
		return thing;
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
	public async createEvent(the_event_name: string, the_event_description: string, the_day: string, time_slots: number[]) {
		this.actions = "Create-Event";
		this.event_name = the_event_name;
		this.event_description = the_event_description;
		this.times = this.slots2timeString(time_slots);
		let temp = the_day.split("-")
		console.log(temp)
		let temp2 = temp[1]+"-"+temp[2]+"-"+temp[0]
		console.log(temp2)
		this.day = temp2
		let call_body = this.makeBody();

		return await this.standardCall(call_body);
	}

	/**
	 * Sends a log in request to the API
	 */
	public async login(user: string) : Promise<void> {
		this.actions = "Sign-Up";
		console.log(user);
		this.user =user;
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


