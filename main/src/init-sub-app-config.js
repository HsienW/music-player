import {globalState} from './global-state';
import {observer, observerKey} from '../../common/observer';
import {configSubAppRender} from './config-sub-app-render';

const loader = loading => configSubAppRender({loading});

const iniSubAppConfig = function (subAppInfo) {
    return subAppInfo.map(item => {
        return {
            ...item,
            container: '#sub-app-viewport',
            loader, // 設定每個子專案初始加載的 loader function
            props: {
                routerBase: item.activeRule, // 設定每個子專案的基本 router
                getGlobalState: globalState.getGlobalState, // 設定每個子專案的 getGlobalState
                observer: observer, // 設定每個子專案 global 的發布訂閱機制
                observerKey: observerKey // 設定每個子專案 global 的發布訂閱主題
            }
        };
    });
};

export {
    iniSubAppConfig
};
