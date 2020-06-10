import { Command } from "../types/Command";
import { Message } from "discord.js";
import { UsesGoogleCalendar } from "../types/UsesGoogleCalendar";
import { Optional } from "typescript-optional";
import moment from "moment";
import * as log4js from "log4js";
import { format } from "url";

const chrono = require("chrono-node");

// init logger
let logger = log4js.getLogger("CreateEvent");
logger.level = "debug";

export class CreateEvent extends UsesGoogleCalendar implements Command {
    public async execute(msg: Message, args: string[]): Promise<void> {
        const s6CalendarId: Optional<string | undefined> = Optional.ofNonNull(
            process.env.GOOGLE_S6_CALENDAR_ID
        )!;

        logger.debug("using calendar ID: " + s6CalendarId.get());

        // Take arguments
        let content: string = args.join(" ");

        let parsedChronoResults: any[] = chrono.parse(content);

        if (parsedChronoResults.length == 0) {
            throw new Error("Unable to parse any dates from the event");
        }

        // logger.debug("using google auth: " + JSON.stringify(this.google.auth));
        logger.debug("parsed time data: " + JSON.stringify(parsedChronoResults));

        let eventContent: string = content.replace(parsedChronoResults[0].text, "");

        let startTime : string = moment(parsedChronoResults[0].start.date()).format()
        logger.debug("parsed start time: " + startTime);

        let endTime: string =
            parsedChronoResults[0].end == null
                ? moment(startTime).add(1, "hour").format()
                : moment(parsedChronoResults[0].end.date()).format();

        logger.debug("parsed end time: " + endTime);

        // insert an event to the S6 calendar that starts one hour from now and ends 2 hours from now
        await this.calendar.events.insert({
            calendarId: s6CalendarId.get(),
            requestBody: {
                summary: eventContent,
                start: {
                    dateTime: startTime
                },
                end: {
                    dateTime: endTime,
                },
            },
        });
    }
}
