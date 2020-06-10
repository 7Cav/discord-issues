import {Octokit} from "@octokit/rest";
import {createAppAuth} from "@octokit/auth-app";
import fs from "fs";
import {Optional} from "typescript-optional";

export abstract class UsesOctokit {
    readonly octokit: Octokit;
    private authKeyFilePath: Optional<string | undefined> = Optional.ofNonNull(process.env.GITHUB_PEM_FILE_PATH)!;

    constructor() {
        let app_id: Optional<string | undefined> = Optional.ofNonNull(process.env.GITHUB_APP_ID);
        let installation_id: Optional<string | undefined> = Optional.ofNonNull(process.env.GITHUB_INSTALLATION_ID);
        let client_id: Optional<string | undefined> = Optional.ofNonNull(process.env.GITHUB_CLIENT_ID);
        let client_secret: Optional<string | undefined> = Optional.ofNonNull(process.env.GITHUB_CLIENT_SECRET);

        this.octokit = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                id: app_id.get(),
                installationId: installation_id.get(),
                privateKey: fs.readFileSync(this.authKeyFilePath.get()!, "utf8"),
                clientId: client_id.get(),
                clientSecret: client_secret.get()
            },
            previews: ["inertia-preview", "machine-man-preview"]
        });
    }
}