/** Handle user data action when the app is running  **/

import {pubSub, pubSubKey} from '../pub-sub';
import {navigationRoute} from '../util';

const userDataMediator = (function () {
    const operations = {};

    operations.userDataMediatorInitSubscribe = function () {
        pubSub.doSubscribe(pubSubKey.user.loggingOut, operations.logout);
    }

    operations.logout = function () {
        console.log('收到登出推送');
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
    userDataMediator
};
