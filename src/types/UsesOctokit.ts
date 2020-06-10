import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import fs from "fs";
import { Optional } from "typescript-optional";

export abstract class UsesOctokit {
    readonly octokit: Octokit;
    private authKeyFilePath: Optional<string | undefined> = Optional.ofNonNull(
        process.env.GITHUB_PEM_FILE_PATH
    )!;

    constructor() {
        const APP_ID: Optional<string | undefined> = Optional.ofNonNull(
            process.env.GITHUB_APP_ID
        );
        const INSTALLATION_ID: Optional<string | undefined> = Optional.ofNonNull(
            process.env.GITHUB_INSTALLATION_ID
        );
        const CLIENT_ID: Optional<string | undefined> = Optional.ofNonNull(
            process.env.GITHUB_CLIENT_ID
        );
        const CLIENT_SECRET: Optional<string | undefined> = Optional.ofNonNull(
            process.env.GITHUB_CLIENT_SECRET
        );

        this.octokit = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                id: APP_ID.get(),
                installationId: INSTALLATION_ID.get(),
                privateKey: fs.readFileSync(
                    this.authKeyFilePath.get()!,
                    "utf8"
                ),
                clientId: CLIENT_ID.get(),
                clientSecret: CLIENT_SECRET.get(),
            },
            previews: ["inertia-preview", "machine-man-preview"],
        });
    }
}
