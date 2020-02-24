import {Event} from './Event'
import {Slot} from './Slot'

export const USERNAME:string = 'YOLO420blazeItMaster69'

export let EVENTS:Event[] = []

//fake event
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
EVENTS.push(event1)
