import {observer, observerKey} from '../observer';

const authLoginChecker = function () {
    if(!JSON.parse(sessionStorage.getItem('user-token'))) {
        observer.doPublish(observerKey.route.routeNavigation, '/portal/login');
    }
}

export {
    authLoginChecker
}
