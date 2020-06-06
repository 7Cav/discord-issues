import {Octokit} from "@octokit/rest";
import {createAppAuth} from "@octokit/auth-app";
import fs from "fs";
import {config} from "node-config-ts";

// let file: string = fs.readFileSync(config.pem_path, "utf8")

export class UsesOctokit {
    octokit: Octokit;

    constructor() {
        this.octokit = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                id: config.github_app_id,
                installationId: config.github_installation_id,
                // privateKey: file,
                clientId: config.client_id,
                clientSecret: config.client_secret
            },
            previews: ["inertia-preview", "machine-man-preview"]
        });
    }
}