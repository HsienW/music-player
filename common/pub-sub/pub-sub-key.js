/** Pub/Sub key **/

const pubSubKey = {
    common: {
        windowOnload: '[common] window-onload',
        routeChange: '[common] route-change',
        playSong: '[common] play-song',
        loading: '[common] loading',
    },
    user: {
        logging: '[user] logging',
        loginSuccess: '[user] login-success',
        loginFail: '[user] login-fail',
        loggingOut: '[user] logging-out',
        loggingSuccess: '[user] logging-out-success',
        loggingFail: '[user] logging-out-fail',
    }
}

export {
    pubSubKey
}
