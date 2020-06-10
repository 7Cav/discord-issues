import {google, GoogleApis} from 'googleapis';
import {GoogleAuth} from "google-auth-library/build/src/auth/googleauth";
import {Optional} from "typescript-optional";

export abstract class UsesGoogle {

    readonly google: GoogleApis = google;

    readonly auth: GoogleAuth;
    private authKeyFilePath: Optional<string | undefined> = Optional.ofNonNull(process.env.GOOGLE_PEM_FILE_PATH)!;

    constructor() {
        this.auth = new google.auth.GoogleAuth({
            keyFile: this.authKeyFilePath.get(),
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });
    }
}