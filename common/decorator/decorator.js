/** Use decorator (AOP) for the app is running at check **/

const decorator = (function () {
    const before = function (target, isHandler) {
        let self = target;
        return function () {
            isHandler.apply(this, arguments);
            return self.apply(this, arguments);
        }
    }

    const after = function (target, isHandler) {
        let self = target;
        return function () {
            let selfReference = self.apply(this, arguments);
            isHandler.apply(this, arguments);
            return selfReference;
        }
    }

    return {
        before: before,
        after: after
    }
})();

export {
    decorator
};
