/** Actively listener when the app is running **/

import {pubSub} from '../pub-sub/pub-sub';

const globalActiveListener = (function () {

    const operations = {};

    operations.initOnloadListener = function () {
        window.addEventListener('load', () => {
            pubSub.doPublish('onload');
        }, false);
    }

    operations.initRouteChangeListener = function () {
        window.addEventListener('popstate', () => {
            pubSub.doPublish('route-change');
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
