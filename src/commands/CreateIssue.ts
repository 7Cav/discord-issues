import {Message} from 'discord.js';
import * as log4js from "log4js";
import {Command} from "../types/Command";
import {UsesOctokit} from "../types/UsesOctokit";
import {Optional} from "typescript-optional";

// init logger
let logger = log4js.getLogger("CreateIssue");
logger.level = "debug";

export class CreateIssue extends UsesOctokit implements Command {

    public async execute(message: Message, args: String[]): Promise<void> {
        // 1. extract issue body
        let content: string = args.join(" ");

        let projectColumnId: Optional<number> = Optional.ofNonNull(Number(process.env.GITHUB_PROJECT_COLUMN_ID))!;

        // 2. call axios/GH api
        await this.octokit.projects.createCard({
            column_id: projectColumnId.get(),
            note: content
        });
    }
}