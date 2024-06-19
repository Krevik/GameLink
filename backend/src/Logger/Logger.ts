enum LogLevel {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
}

class Logger {
    private prefix: string;

    constructor(prefix: string = "") {
        this.prefix = prefix;
    }

    private formatMessage(level: LogLevel, message: string): string {
        let colorCode;
        switch (level) {
            case LogLevel.INFO:
                colorCode = "\x1b[34m"; // Blue
                break;
            case LogLevel.WARNING:
                colorCode = "\x1b[33m"; // Yellow
                break;
            case LogLevel.ERROR:
                colorCode = "\x1b[31m"; // Red
                break;
            default:
                colorCode = "\x1b[37m"; // White
        }

        const resetCode = "\x1b[0m"; // Reset
        const timestamp = new Date().toISOString();
        return `${colorCode}[${timestamp}] [${level.toUpperCase()}]${this.prefix ? ` [${this.prefix}]` : ""} ${message}${resetCode}`;
    }

    info(message: string): void {
        console.log(this.formatMessage(LogLevel.INFO, message));
    }

    warning(message: string): void {
        console.warn(this.formatMessage(LogLevel.WARNING, message));
    }

    error(message: string): void {
        console.error(this.formatMessage(LogLevel.ERROR, message));
    }

    setPrefix(prefix: string): void {
        this.prefix = prefix;
    }
}

export default Logger;
