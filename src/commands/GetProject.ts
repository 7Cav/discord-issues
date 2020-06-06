import {UsesOctokit} from "../types/UsesOctokit";
import {Command} from "../types/Command";
import {Message} from "discord.js";

export class GetProject extends UsesOctokit implements Command {
    public async execute(message: Message, args: String[]): Promise<void> {
        await message.reply("https://github.com/orgs/7Cav/projects/1");
    }

}