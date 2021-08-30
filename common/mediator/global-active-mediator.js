/** Actively Mediator when the app is running notice handler **/

import {pubSub, pubSubKey} from '../pub-sub';
import {navigationRoute} from '../util';

const globalActiveMediator = (function () {
    const operations = {};

    operations.initGlobalMediatorSubscribe = function () {
        pubSub.doSubscribe(pubSubKey.route.routeNavigation, operations.routeNavigation)
        pubSub.doSubscribe(pubSubKey.auth.loggingOut, operations.logout);
    }

    operations.routeNavigation = function (route) {
        let newRoute = Array.prototype.slice.call(arguments)[0][0];
        navigationRoute(newRoute);
    }

    operations.logout = function () {
        sessionStorage.removeItem('user-info');
        sessionStorage.removeItem('user-token');
        navigationRoute('/portal/login');
    }

    //處理呼叫參數的介面
    const callAction = function () {
        let action = Array.prototype.shift.call(arguments);
        operations[action].apply(this, arguments);
    }

    return {
        callAction: callAction
    };
})();

export {
    globalActiveMediator
};
