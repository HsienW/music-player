// const singleAppGlobalState = (function () {
//     let state = {};
//
//     const setGlobalState = (key, value) => {
//         state[key] = value;
//     };
//
//     const getGlobalState = (key) => {
//         return key ? state[key] : state;
//     };
//
//     const onStateChange = (newState, prev) => {
//         console.log('global state change', JSON.stringify(newState), JSON.stringify(prev));
//
//         for (const key in newState) {
//             state[key] = newState[key];
//         }
//     };
//
//     return {
//         setGlobalState: setGlobalState,
//         getGlobalState: getGlobalState,
//         onStateChange: onStateChange
//     };
// })();
//
// export {
//     singleAppGlobalState
// }

const SingleAppGlobalState = function () {
    let state = {};

    const setGlobalState = (key, value) => {
        state[key] = value;
    };

    const getGlobalState = (key) => {
        return key ? state[key] : state;
    };

    const onStateChange = (newState, prev) => {
        console.log('global state change', JSON.stringify(newState), JSON.stringify(prev));

        for (const key in newState) {
            state[key] = newState[key];
        }
    };

    return {
        setGlobalState: setGlobalState,
        getGlobalState: getGlobalState,
        onStateChange: onStateChange
    };
};

const singleAppGlobalState = new SingleAppGlobalState();

export {
    singleAppGlobalState
}

