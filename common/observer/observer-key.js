/** Observer pattern is registration Pub/Sub key **/

const observerKey = {
    common: {
        windowOnload: '[common] window-onload',
        urlChange: '[common] url-change',
        playSong: '[common] play-song',
        loading: '[common] loading',
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
        routeNavigation: '[common] route-navigation',
    }
}

export {
    observerKey
}
