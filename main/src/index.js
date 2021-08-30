import {registerMicroApps, start, setDefaultMountApp} from 'qiankun';
import {iniSubAppConfig} from './init-sub-app-config';
import {subAppInfo} from './config-sub-app-info';
import {globalActiveListener} from '../../common/listener/global-active-listener';
import {globalActiveMediator} from '../../common/mediator/global-active-mediator';

registerMicroApps(
    iniSubAppConfig(subAppInfo),
    {
        beforeLoad: [
            app => {
                console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
            }
        ],
        beforeMount: [
            app => {
                console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            }
        ],
        afterUnmount: [
            app => {
                console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            }
        ]
    }
);

setDefaultMountApp('/portal/login');
start();
globalActiveListener.initAllAction();
globalActiveMediator.callAction('initGlobalMediatorSubscribe');
