export declare enum AuthenticatedState {
    Unknown = "unknown",
    Authenticated = "authenticated",
    LoggedOut = "logged_out"
}
export declare function AuthenticatedStateFromJSON(json: any): AuthenticatedState;
export declare function AuthenticatedStateFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthenticatedState;
export declare function AuthenticatedStateToJSON(value?: AuthenticatedState | null): any;
