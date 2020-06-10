import * as log4js from "log4js";
import { Client } from "discord.js";
import { Command } from "./types/Command";
import { CreateIssue } from "./commands/CreateIssue";
import "./lib/env";
import { Optional } from "typescript-optional";
import { GetProject } from "./commands/GetProject";
import { CreateEvent } from "./commands/CreateEvent";

// init logger
let logger = log4js.getLogger("bootstrap");
logger.level = "debug";

logger.info("Starting App");

// @TODO move to config
let PREFIX = "!";

// Add command objects to map for later lookup
let commandMap = new Map<String, Command>();
commandMap.set("issue", new CreateIssue());
commandMap.set("project", new GetProject());
commandMap.set("calendar", new CreateEvent());

logger.info("Commands loaded");

// Start discord client + event handlers
let client: Client = new Client();

//Bot login
let discord_token: Optional<string | undefined> = Optional.ofNonNull(
    process.env.DISCORD_BOT_TOKEN
);
client.login(discord_token.get()).then(() => {
    logger.info(`logged in as ${client.user?.tag}!`);
});

logger.info("Client init");

client.on("ready", () => {
    logger.info("discord client ready");
    console.log("ready");
});

// Crash reporting
client.on("disconnect", () => logger.error("Connection Lost..."));
client.on("error", (error) => logger.error(error));
client.on("warn", (info) => logger.error(info));

// dynamic command lookup
client.on("message", (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) {
        return;
    }

    let args: String[] = message.content.slice(PREFIX.length).split(/ +/);
    let command: String = args.shift()!.toLowerCase();

    if (commandMap.has(command)) {
        message.react("👀");

        message.react("⚙️");

        logger.debug(`processing action for: ${command}`);

        commandMap
            .get(command)!
            .execute(message, args)
            .then(() => message.react("✅"))
            .catch((error) => {
                message.react("❌");
                logger.error("Exception ", error);
            });
    }
});

logger.info("Events setup");
