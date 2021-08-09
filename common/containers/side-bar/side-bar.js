import {routeNavigation} from '../../util/route-navigation';
import {pubSub} from '../../pub-sub/pub-sub';
import {sideBarStyle} from './side-bar-style';
// import {subAppInfo} from '../../../main/src/config-sub-app-info';

class SideBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.domStyling();
        this.domRender();
        this.domEventInit();
        pubSub.doSubscribe('onload', this.updateDomActiveStyle.bind(this));
        pubSub.doSubscribe('route-change', this.updateDomActiveStyle.bind(this));
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
        this.sideBarReact1Li = document.createElement('li');
        this.sideBarPortalLink = document.createElement('a');
        this.sideBarReact1Link = document.createElement('a');

        this.sideBarBody.className = 'side-bar';
        this.sideBarUl.className = 'side-bar-menu';

        this.sideBarPortalLink.textContent = 'Portal';
        this.sideBarReact1Link.textContent = 'React1';

        this.sideBarUl.setAttribute('id', 'side-bar');

        this.sideBarPortalLi.setAttribute('active-rule', '/portal');
        this.sideBarReact1Li.setAttribute('active-rule', '/search');

        this.sideBarPortalLink.setAttribute('active-rule', '/portal');
        this.sideBarReact1Link.setAttribute('active-rule', '/search');

        this.shadow.appendChild(this.sideBarBody);
        this.sideBarBody.appendChild(this.sideBarUl);
        this.sideBarUl.appendChild(this.sideBarPortalLi);
        this.sideBarUl.appendChild(this.sideBarReact1Li);
        this.sideBarPortalLi.appendChild(this.sideBarPortalLink);
        this.sideBarReact1Li.appendChild(this.sideBarReact1Link);
    }

    domEventInit() {
        this.sideBarUl.addEventListener('click', this.sideBarItemClick.bind(this), false);
    }

    sideBarItemClick(event) {
        let targetActive = event.target.getAttribute('active-rule');
        routeNavigation(targetActive);
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
