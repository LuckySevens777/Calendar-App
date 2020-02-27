/**
 * contains the information needed for an event
 */
export let EVENTS:Event[] = [];
export class Event {

    public name:string
    public description:string
    public creatorName:string
    public uniqueID:string
    public date:string
    public timeSlots:number[]
    public members:{name:string, availability:number[]}[]

    /**
     * just makes typescript happy
     */
    public constructor() {}
}
