function routeNavigation(route) {
    if (route === undefined || route === null || typeof route !== 'string') {
        throw new Error('Please check the param route type, it must be string.');
        return;
    }
    history.pushState(null, null, route);
}

export {
    routeNavigation
}
