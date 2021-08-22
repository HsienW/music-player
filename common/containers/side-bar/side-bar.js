import {navigationRoute} from '../../util';
import {pubSub, pubSubKey} from '../../pub-sub';
import {sideBarStyle} from './side-bar-style';
// import {subAppInfo} from '../../../main/src/config-sub-app-info';

class SideBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.domStyling();
        this.domRender();
        this.domEventInit();
        pubSub.doSubscribe(pubSubKey.common.windowOnload, this.updateDomActiveStyle.bind(this));
        pubSub.doSubscribe(pubSubKey.common.routeChange, this.updateDomActiveStyle.bind(this));
    }

    domStyling() {
        let style = document.createElement('style');
        style.textContent = sideBarStyle;
        this.shadow.appendChild(style);
    }

    domRender() {
        this.sideBarBody = document.createElement('div');
        this.sideBarUl = document.createElement('ul');
        this.sideBarPortalLi = document.createElement('li');
        this.sideBarSearchLi = document.createElement('li');
        this.sideBarPlaylistLi = document.createElement('li');
        this.sideBarPortalLink = document.createElement('a');
        this.sideBarSearchLink = document.createElement('a');
        this.sideBarPlaylistLink = document.createElement('a');

        this.sideBarBody.className = 'side-bar';
        this.sideBarUl.className = 'side-bar-menu';

        this.sideBarPortalLink.textContent = 'Home';
        this.sideBarSearchLink.textContent = 'Search';
        this.sideBarPlaylistLink.textContent = 'Play list';

        this.sideBarUl.setAttribute('id', 'side-bar');

        this.sideBarPortalLi.setAttribute('active-rule', '/portal');
        this.sideBarPlaylistLi.setAttribute('active-rule', '/playlist');
        this.sideBarSearchLi.setAttribute('active-rule', '/search');

        this.sideBarPortalLink.setAttribute('active-rule', '/portal/home');
        this.sideBarPlaylistLink.setAttribute('active-rule', '/playlist/all-categories');
        this.sideBarSearchLink.setAttribute('active-rule', '/search');

        this.shadow.appendChild(this.sideBarBody);
        this.sideBarBody.appendChild(this.sideBarUl);
        this.sideBarUl.appendChild(this.sideBarPortalLi);
        this.sideBarUl.appendChild(this.sideBarPlaylistLi);
        this.sideBarUl.appendChild(this.sideBarSearchLi);
        this.sideBarPortalLi.appendChild(this.sideBarPortalLink);
        this.sideBarPlaylistLi.appendChild(this.sideBarPlaylistLink);
        this.sideBarSearchLi.appendChild(this.sideBarSearchLink);
    }

    domEventInit() {
        this.sideBarUl.addEventListener('click', this.sideBarItemClick.bind(this), false);
    }

    sideBarItemClick(event) {
        let targetActive = event.target.getAttribute('active-rule');
        navigationRoute(targetActive);
    }

    updateDomActiveStyle() {
        for (let i = 0; i < this.sideBarUl.childNodes.length; i++) {
            this.sideBarUl.childNodes[i].removeAttribute('class');

            if (location.pathname.includes(this.sideBarUl.childNodes[i].getAttribute('active-rule'))) {
                this.sideBarUl.childNodes[i].setAttribute('class', 'active');
            }
        }
    }
}

customElements.define('side-bar-container', SideBar);

export {
    SideBar
}
