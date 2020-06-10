import moment from "moment";

const CONFIG = require('./config/Settings');
let cal = new CalendarAPI(CONFIG);

export class GoogleCalendar {
    constructor(startDate:string, endDate: string, startTime: string, endTime: string, location: string, Summary: string, Status: string, Desc: string) {
        let startT  = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD hh:mm').tz("Europe/London").utc().subtract(5, 'hours').format();
        let endT = moment(`${endDate} ${endTime}`, 'YYYY-MM-DD hh:mm').tz("Europe/London").utc().subtract(5, 'hours').format();

        let params = {
            'start': { 'dateTime': `${startT}` },
            'end': { 'dateTime': `${endT}` },
            'location': `${location}`,
            'summary': `${Summary}`,
            'status': `${Status}`,
            'description': `${Desc}`,
            'colorId': 1
        };
    }
}