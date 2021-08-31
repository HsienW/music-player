/** Actively listener when the app is running **/

import {observer, observerKey} from '../observer';

const globalActiveListener = (function () {
    const operations = {};

    operations.initOnloadListener = function () {
        window.addEventListener('load', () => {
            observer.doPublish(observerKey.common.windowOnload);
        }, false);
    }

    operations.initRouteChangeListener = function () {
        window.addEventListener('popstate', () => {
            observer.doPublish(observerKey.common.urlChange);
        }, false);
    }

    // operations.initGetAuthListener = function () {
    //     window.addEventListener('message', (event) => {
    //         if(event.data.action === 'auth-spotify') {
    //             sessionStorage.setItem('user-account', JSON.stringify(event.data.account));
    //             sessionStorage.setItem('user-name', JSON.stringify(event.data.userName));
    //             sessionStorage.setItem('user-token', JSON.stringify(event.data.token));
    //         }
    //     }, false);
    // }

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
