import {initGlobalState} from 'qiankun';

const initialState = {
    init: 'init'
};

const globalState = initGlobalState(initialState);

globalState.onGlobalStateChange((newState, prev) => {
    console.log('main change', JSON.stringify(newState), JSON.stringify(prev));

    for (const key in newState) {
        initialState[key] = newState[key];
    }
});

globalState.getGlobalState = (key) => {
    return key ? initialState[key] : initialState;
};

export {
    globalState
};
