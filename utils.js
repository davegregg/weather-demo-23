function log(message, importance="info", date=new Date()) {
    let logger = null
    switch (importance) {
        case "error":
        case "urgent":
            logger = console.error
            break

        case "warn":
        case "medium":
            logger = console.warn
            break

        case "info":
        case "log":
        case "low":
        default:
            logger = console.log
    }

    logger(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

function info (message) {
    log(message, "info")
}

function warn(message) {
    log(message, "warn")
}

function error(message) {
    log(message, "error")
}
