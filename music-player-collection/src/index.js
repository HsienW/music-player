import React from 'react';
import ReactDOM from 'react-dom';
import {singleAppGlobalState} from '../../common/state/single-app-global-state';
import {globalActiveListener} from '../../common/listener/global-active-listener';
import {globalActiveMediator} from '../../common/mediator/global-active-mediator';
import {observer, observerKey} from '../../common/observer';
import {CollectionRootDom} from './root/root';
import './public-path';

function renderCollectionRoot(props) {
    const {container, routerBase, setGlobalState, getGlobalState, onStateChange, observer, observerKey} = props;
    ReactDOM.render(
        <CollectionRootDom
            routerBase={routerBase}
            setGlobalState={setGlobalState}
            getGlobalState={getGlobalState}
            onStateChange={onStateChange}
            observer={observer}
            observerKey={observerKey}
        />,
        container ? container.querySelector('#collection-root') : document.querySelector('#collection-root')
    );
}

function renderSingleCollectionRoot(props) {
    import ('../../common/containers/loading-spin/loading-spin');
    import ('../../common/containers/side-bar/side-bar');
    import ('../../common/containers/header-bar/header-bar');
    import ('../../common/containers/player-bar/player-bar');
    import ('./root/root.scss');

    const {container, routerBase, setGlobalState, getGlobalState, onStateChange, observer, observerKey} = props;

    ReactDOM.render(
        <>
            <auth-container/>
            <loading-spin-container/>
            <div className="main-layout">
                <div className="side-layout">
                    <side-bar-container/>
                </div>
                <div className="header-layout">
                    <header-bar-container/>
                </div>
                <div className="content-layout">
                    <CollectionRootDom
                        routerBase={routerBase}
                        setGlobalState={setGlobalState}
                        getGlobalState={getGlobalState}
                        onStateChange={onStateChange}
                        observer={observer}
                        observerKey={observerKey}
                    />
                </div>
                <div className="footer-layout">
                    <player-bar-container/>
                </div>
            </div>
        </>,
        container ? container.querySelector('#collection-root') : document.querySelector('#collection-root')
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    console.log('collection 我自己運行了');

    const routerBase = '/collection';
    const authRedirectURL = `${routerBase}/all-categories`;
    const {getGlobalState, setGlobalState} = singleAppGlobalState;
    const props = {routerBase, getGlobalState, setGlobalState, observer, observerKey};

    sessionStorage.setItem('auth-redirect-url', JSON.stringify(authRedirectURL));
    singleAppGlobalState.setGlobalState('init', 'collection 我自己運行了');
    globalActiveListener.initAllAction();
    globalActiveMediator.callAction('initGlobalMediatorSubscribe');

    renderSingleCollectionRoot(props);
}

/**
 * bootstrap 只會再 init 的時候 call 一次, 之後重新加載會直接 call mount hook
 * 通常這個 bootstrap hook 是用來做一些 global 變數的 init, 像是不會再 unmount 被清掉的 catch
 */
export async function bootstrap() {
    console.log('react app bootstrap is work');
}

/**
 * 每次加載進子專案都會 call mount, 一般 render 也會在這邊 call
 */
export async function mount(props) {
    renderCollectionRoot(props);
}

/**
 * 每次切換 or 卸載進子專案都會 call unmount, 一般會在這裡銷毀子專案的 instance
 */
export async function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('collection-root'));
}
