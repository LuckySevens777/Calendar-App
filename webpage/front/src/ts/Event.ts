/**
 * contains the information needed for an event
 */
export class Event {

    public name:string
    public description:string
    public creatorName:string
    public uniqueID:string
    public date:string
    public timeSlots:number[]
    public members:string[]

    /**
     * just makes typescript happy
     */
    public constructor() {}
}
