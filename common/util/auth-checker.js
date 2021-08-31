import {navigationRoute} from './route';

const authLoginChecker = function () {
    if(!JSON.parse(sessionStorage.getItem('user-token'))) {
        navigationRoute('/portal/login');
    }
}

export {
    authLoginChecker
}
