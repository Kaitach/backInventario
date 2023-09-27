/* eslint-disable prettier/prettier */
import { bgBlue, bgGreen, redBright,blackBright } from "colorette";
export class CreatedEvent<T> {
    constructor(public readonly data: T) {
        console.log(bgGreen('***********************'));
        console.log(redBright(`**************`));
        console.log(blackBright('Event created'));
        console.log(redBright(`**************`));
        console.log(bgBlue('***********************'));
    } 
}