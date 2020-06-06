import {Message} from 'discord.js';
import * as log4js from "log4js";
import {Command} from "../types/Command";
import {UsesOctokit} from "../types/UsesOctokit";

// init logger
let logger = log4js.getLogger("CreateIssue");
logger.level = "debug";

export class CreateIssue extends UsesOctokit implements Command {

    public async execute(message: Message, args: String[]) {
        await message.react('👀');

        // 1. extract issue body
        let content: string = args.shift()!.toString();

        await message.react('⚙️');

        // 2. call axios/GH api
        this.octokit.projects.createCard({
            column_id: 9282033,
            note: content
        });

        await message.react('✅');
    }
}