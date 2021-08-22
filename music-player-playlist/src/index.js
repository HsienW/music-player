import React from 'react';
import ReactDOM from 'react-dom';
import { singleAppGlobalState } from '../../common/state/single-app-global-state';
import { globalActiveListener } from '../../common/listener/global-active-listener';
import { pubSub, pubSubKey } from '../../common/pub-sub';
import { PlaylistRootDom } from './root/root';
import './public-path';

function renderPlaylistRoot(props) {
    const { container, routerBase, setGlobalState, getGlobalState, onStateChange, pubSub, pubSubKey } = props;
    ReactDOM.render(
        <PlaylistRootDom
            routerBase={routerBase}
            setGlobalState={setGlobalState}
            getGlobalState={getGlobalState}
            onStateChange={onStateChange}
            pubSub={pubSub}
            pubSubKey={pubSubKey}
        />,
        container ? container.querySelector('#playlist-root') : document.querySelector('#playlist-root')
    );
}

function renderSinglePlaylistRoot(props) {
    import ('../../common/containers/loading-spin/loading-spin');
    import ('../../common/containers/side-bar/side-bar');
    import ('../../common/containers/header-bar/header-bar');
    import ('../../common/containers/player-bar/player-bar');
    import ('./root/root.scss');

    const { container, routerBase, setGlobalState, getGlobalState, onStateChange, pubSub, pubSubKey} = props;

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
                    <PlaylistRootDom
                        routerBase={routerBase}
                        setGlobalState={setGlobalState}
                        getGlobalState={getGlobalState}
                        onStateChange={onStateChange}
                        pubSub={pubSub}
                        pubSubKey={pubSubKey}
                    />
                </div>
                <div className="footer-layout">
                    <player-bar-container/>
                </div>
            </div>
        </>,
        container ? container.querySelector('#playlist-root') : document.querySelector('#playlist-root')
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    console.log('playlist 我自己運行了');

    const routerBase = '/playlist';
    const authRedirectURL = `${routerBase}/album`;
    const { getGlobalState, setGlobalState } = singleAppGlobalState;
    const props = { routerBase, getGlobalState, setGlobalState, pubSub, pubSubKey };

    sessionStorage.setItem('auth-redirect-url', JSON.stringify(authRedirectURL));
    singleAppGlobalState.setGlobalState('init', 'playlist 我自己運行了');
    globalActiveListener.initAllAction();

    renderSinglePlaylistRoot(props);
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
    renderPlaylistRoot(props);
}

/**
 * 每次切換 or 卸載進子專案都會 call unmount, 一般會在這裡銷毀子專案的 instance
 */
export async function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('playlist-root'));
}
