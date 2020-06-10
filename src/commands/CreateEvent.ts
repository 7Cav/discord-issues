import { Command } from "../types/Command";
import { Message } from "discord.js";
import { GoogleCalendar } from "../types/GoogleCalendar";

export class CreateEvent extends GoogleCalendar implements Command {

    public async execute(msg: Message, args: String[]): Promise<void> {
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

        function waitMessage(msg: Message): void {

        }

        await msg.channel.awaitMessages();
         // respond after each argument is given until the command is complete.
    }

}