/** Pub/Sub pattern **/

const pubSub = (function () {
    const subscriberList = {};

    const doSubscribe = function (key, callback) {
        if (!subscriberList[key]) {
            subscriberList[key] = [];
        }
        subscriberList[key].push(callback);
    }

    const doPublish = function () {

        const key = Array.prototype.shift.call(arguments);

        console.log('iiiiiiiiiiiiiiiiii');
        console.log(key);
        console.log(this);


        const callbacks = subscriberList[key];

        console.log(subscriberList);
        console.log(callbacks);

        if (!callbacks || callbacks.length === 0) {
            console.log('zzzzzzzzzzzzzzz');
            return false;
        }

        for (let i = 0; i < callbacks.length; i++) {
            console.log('wwwwwwwwwwww');
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
    pubSub
}
