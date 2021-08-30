/** Handle route action when the app is running  **/

import {pubSub, pubSubKey} from '../pub-sub';
import {navigationRoute} from '../util';

const routeMediator = (function () {
    const operations = {};

    operations.routeMediatorInitSubscribe = function () {
        pubSub.doSubscribe(pubSubKey.route.routeChange, operations.routeChange);
    }

    operations.routeChange = function (route) {
        console.log('收到路由變化 收到路由變化');
        console.log(route);
        navigationRoute(arguments);
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
    routeMediator
};
