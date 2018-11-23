let logLevel = 'debug';

let logLevels = ['verbose', 'debug', 'quiet'];

function info(message) {
    if (logLevels.indexOf(logLevel) < 1) {
        console.info(message);
    }
}

module.exports = {
    info: info
};
