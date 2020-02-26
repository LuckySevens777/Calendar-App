//This whole file is just used for testing while I don't have actual data
//it can be deleted whenever the API is connected
import {Event} from './Event'
import {Slot} from './Slot'

export const USERNAME:string = 'YOLO420blazeItMaster69'

export let EVENTS:Event[] = []

//fake events
let event1 = new Event
event1.name = 'Test Event'
event1.description = 'A desription'
event1.creatorName = USERNAME
event1.uniqueID = 'INVALID-ID'
event1.date = '02/23/2020'
event1.timeSlots = []
for(let i = 0; i < 72; i++) {
    if(!!Math.round(Math.random())) event1.timeSlots.push(i)
}
event1.members = ['big D', 'the sultan of zanzibar', 'jim', 'jimmy', 'johnny']

EVENTS.push(event1)
EVENTS.push(event1)
EVENTS.push(event1)
EVENTS.push(event1)
EVENTS.push(event1)
