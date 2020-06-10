import { Command } from "../types/Command";
import { Message } from "discord.js";
import {UsesGoogleCalendar} from "../types/UsesGoogleCalendar";
import {Optional} from "typescript-optional";
import moment from "moment";
import * as log4js from "log4js";

// init logger
let logger = log4js.getLogger("CreateEvent");
logger.level = "debug";

export class CreateEvent extends UsesGoogleCalendar implements Command {

    public async execute(msg: Message, args: String[]): Promise<void> {

        let s6CalendarId: Optional<string | undefined> = Optional.ofNonNull(process.env.GOOGLE_S6_CALENDAR_ID)!;

        logger.debug("using calendar ID: " + s6CalendarId.get());
        // Take arguments
        let auth: any = msg.author.id;
        let content: string = args.join(" ");
        let data: any = function(msg: Message): void {
            // TODO: send first question and await response or timeout;
            // TODO: Next data validate the response;
            // TODO: Next send next question and await response or timeout;
            // TODO: Data validate and response;
            // TODO: Continue until all questions are answered;
        }

        // function waitMessage(msg: Message): void {
        //
        // }

        // await msg.channel.awaitMessages();
         // respond after each argument is given until the command is complete.

        logger.debug("using google auth: " + JSON.stringify(this.google.auth));

        // insert an event to the S6 calendar that starts one hour from now and ends 2 hours from now
        await this.calendar.events.insert({
            calendarId: s6CalendarId.get(),
            requestBody: {
                summary: content,
                start: {
                    dateTime: moment().add(1, "hour").format()
                },
                end: {
                    dateTime: moment().add(2, "hour").format()
                }
            }
        })
    }

}