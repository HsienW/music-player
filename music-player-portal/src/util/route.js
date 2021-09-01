const createParamRoute = function (route, paramObject) {
    let navigationURL = new URL(window.location.origin);
    let searchParams = new URLSearchParams(paramObject);
    navigationURL.pathname = route;
    navigationURL.search = searchParams;
    return navigationURL.href;
}

const navigationRoute = function (route) {
    if (route === undefined || route === null || typeof route !== 'string') {
        throw new Error('Please check the param route type, it must be string.');
        return;
    }
    history.pushState(null, null, route);
}


export {
    createParamRoute,
    navigationRoute,
}
