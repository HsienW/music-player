/** Observer pattern use Pub/Sub action to handler **/

const observer = (function () {
    const subscriberList = {};

    const doSubscribe = function (key, callback) {
        if (!subscriberList[key]) {
            subscriberList[key] = [];
        }
        subscriberList[key].push(callback);
    }

    const doPublish = function () {
        const key = Array.prototype.shift.call(arguments);
        const callbacks = subscriberList[key];

        console.log(subscriberList);
        console.log(callbacks);

        if (!callbacks || callbacks.length === 0) {
            return false;
        }

        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](arguments);
        }
    }

    const unSubscribe = function (key, callback) {
        const callbacks = subscriberList[key];

        if (!callbacks && !callback) {
            return false;
        }

        for (let i = callbacks.length - 1; i >= 0; i--) {
            // const isCallback = callbacks[i];

            if (subscriberList[key]) {
                callbacks.splice(i, 1);
            }
        }
    }

    return {
        doSubscribe: doSubscribe,
        doPublish: doPublish,
        unSubscribe: unSubscribe
    }

})();

export {
    observer
}
