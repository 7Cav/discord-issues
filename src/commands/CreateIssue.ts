import {Message} from 'discord.js';
import * as log4js from "log4js";
import {Command} from "../types/Command";
import {UsesOctokit} from "../types/UsesOctokit";

// init logger
let logger = log4js.getLogger("CreateIssue");
logger.level = "debug";

export class CreateIssue extends UsesOctokit implements Command {

    public async execute(message: Message, args: String[]): Promise<void> {
        // 1. extract issue body
        let content: string = args.join(" ");

        // 2. call axios/GH api
        await this.octokit.projects.createCard({
            column_id: 9282033,
            note: content
        });
    }
}