import { Message } from "discord.js";

export interface Command {
    execute: (message: Message, args: String[]) => Promise<void>;
}
