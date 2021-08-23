/** Actively listener when the app is running **/

import {pubSub} from '../pub-sub';
import {pubSubKey} from '../pub-sub';

const globalActiveListener = (function () {

    const operations = {};

    operations.initOnloadListener = function () {
        window.addEventListener('load', () => {
            pubSub.doPublish(pubSubKey.common.windowOnload);
        }, false);
    }

    operations.initRouteChangeListener = function () {
        window.addEventListener('popstate', () => {
            pubSub.doPublish(pubSubKey.common.routeChange);
        }, false);
    }

    operations.initGetAuthListener = function () {
        window.addEventListener('message',  (event) => {
            console.log('書書書書書書書書書');
            console.log(event.data);
        }, false);
    }

    //呼叫初始運行後全部監聽的
    const initAllAction = function () {
        for (let key in operations) {
            operations[key]();
        }
    }

    //呼叫運行時單一監聽的
    const callAction = function () {
        let action = Array.prototype.shift.call(arguments);
        operations[action].apply(this, arguments);
    }

    return {
        initAllAction: initAllAction,
        callAction: callAction,
    }

})();

export {
    globalActiveListener
}
