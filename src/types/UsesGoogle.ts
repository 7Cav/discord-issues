import {google, GoogleApis} from 'googleapis';
import {GoogleAuth} from "google-auth-library/build/src/auth/googleauth";
import {Optional} from "typescript-optional";
import fs from "fs";

export abstract class UsesGoogle {

    readonly google: GoogleApis = google;

    private readonly auth: GoogleAuth;
    private authKeyFilePath: Optional<string | undefined> = Optional.ofNonNull(process.env.GOOGLE_PEM_FILE_PATH)!;

    protected constructor() {
        this.auth = new google.auth.GoogleAuth({
            keyFile: fs.readFileSync(this.authKeyFilePath.get()!, "utf8"),
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });

        this.google.options({
            auth: this.auth
        });
    }
}