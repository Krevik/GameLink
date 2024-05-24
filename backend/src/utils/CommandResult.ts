export class CommandResult {
    isSuccess: boolean;
    message?: string;

    constructor(isSuccess: boolean, message?: string) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    public static success(): CommandResult {
        return new CommandResult(true);
    }

    public static failure(message: string): CommandResult {
        return new CommandResult(false, message);
    }
}
