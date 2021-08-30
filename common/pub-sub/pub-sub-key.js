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
    },
    auth: {
        logging: '[auth] logging',
        loginSuccess: '[auth] login-success',
        loginFail: '[auth] login-fail',
        loggingOut: '[auth] logging-out',
        loggingSuccess: '[auth] logging-out-success',
        loggingFail: '[auth] logging-out-fail',
    },
    player: {
        songPlay: '[player] song-play',
        clearPlay: '[player] clear-all-play',
    },
    route: {
        routeChange: '[common] route-change',
    }
}

export {
    pubSubKey
}
