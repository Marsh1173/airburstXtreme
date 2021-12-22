export function forceGetInputString(msg: string, defaultString: string): string {
    let inputtedName: string | null = window.prompt(msg, defaultString);
    if (inputtedName != null) {
        return inputtedName;
    }
    return defaultString;
}
export function optionalGetInputString(msg: string, defaultString: string): string | undefined {
    let inputtedName: string | null = window.prompt(msg, defaultString);
    if (inputtedName != null) {
        return inputtedName;
    }
    return undefined;
}
