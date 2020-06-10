import {calendar_v3} from "googleapis";
import Calendar = calendar_v3.Calendar;
import {UsesGoogle} from "./UsesGoogle";

export abstract class UsesGoogleCalendar extends UsesGoogle {

    readonly calendar : Calendar;

    constructor() {
        super();

        this.calendar = this.google.calendar({
            auth: this.google.auth,
            version: "v3"
        });
    }
}