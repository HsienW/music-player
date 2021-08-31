import {headerBarStyle} from './header-bar-style';
import {observer, observerKey} from '../../observer';

class HeaderBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.domStyling();
        this.domRender();
        this.domEventInit();
    }

    domStyling() {
        let style = document.createElement('style');
        style.textContent = headerBarStyle;
        this.shadow.appendChild(style);
    }

    domRender() {
        this.headerBarBody = document.createElement('div');
        this.logoArea = document.createElement('div');
        this.logoText = document.createElement('div');

        this.userInfoArea = document.createElement('div');
        this.userImage = document.createElement('img');
        this.userName = document.createElement('div');

        this.userDropdown = document.createElement('label');
        this.userDropdownButton = document.createElement('img');
        this.userDropdownUl = document.createElement('ul');
        this.userDropdownSettingLi = document.createElement('li');
        this.userDropdownLogoutLi = document.createElement('li');
        this.userDropdownSettingLink = document.createElement('a');
        this.userDropdownLogoutLink = document.createElement('a');
        this.userDropdownSettingIcon = document.createElement('img');
        this.userDropdownLogoutLIcon = document.createElement('img');

        this.headerBarBody.className = 'header-bar';
        this.logoArea.className = 'logo-area';
        this.logoText.className = 'logo-text';
        this.userInfoArea.className = 'user-info-area';
        this.userImage.className = 'user-image';
        this.userName.className = 'user-name';

        this.userDropdown.className = 'user-setting-dropdown';
        this.userDropdownButton.className = 'user-setting-icon button';
        this.userDropdownUl.className = 'menu hidden';
        this.userDropdownSettingIcon.className = 'icon';
        this.userDropdownLogoutLIcon.className = 'icon';

        this.logoText.textContent = 'Music Player';
        this.userName.textContent = 'Default User';

        this.userDropdownSettingLink.textContent = 'Setting';
        this.userDropdownLogoutLink.textContent = 'Logout';

        this.userImage.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/user.svg');
        this.userDropdownButton.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/down-arrow.svg');
        this.userDropdownSettingIcon.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/settings.svg');
        this.userDropdownLogoutLIcon.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/logout.svg');

        this.shadow.appendChild(this.headerBarBody);
        this.headerBarBody.appendChild(this.logoArea);
        this.headerBarBody.appendChild(this.userInfoArea);
        this.logoArea.appendChild(this.logoText);
        this.userInfoArea.appendChild(this.userImage);
        this.userInfoArea.appendChild(this.userName);
        this.userInfoArea.appendChild(this.userDropdown);
        this.userDropdown.appendChild(this.userDropdownButton);
        this.userDropdown.appendChild(this.userDropdownUl);
        this.userDropdownUl.appendChild(this.userDropdownSettingLi);
        this.userDropdownUl.appendChild(this.userDropdownLogoutLi);
        this.userDropdownSettingLi.appendChild(this.userDropdownSettingIcon);
        this.userDropdownSettingLi.appendChild(this.userDropdownSettingLink);
        this.userDropdownLogoutLi.appendChild(this.userDropdownLogoutLIcon);
        this.userDropdownLogoutLi.appendChild(this.userDropdownLogoutLink);
    }

    updateDomActiveStyle(target, condition, styleName) {
        if (!target.classList.contains(condition)) {
            target.classList.add(styleName);
        } else {
            target.classList.remove(styleName);
        }
    }

    domEventInit() {
        this.userDropdownButton.addEventListener('mouseover', () => {
            this.updateDomActiveStyle(this.userDropdownUl, 'hidden', 'hidden');
        }, false);

        this.userDropdownUl.addEventListener('mouseleave', () => {
            this.updateDomActiveStyle(this.userDropdownUl, 'hidden', 'hidden');
        }, false);

        this.userDropdownLogoutLi.addEventListener('click', () => {
            console.log('點了登出');
            observer.doPublish(observerKey.auth.loggingOut);
        }, false);
    }

}

customElements.define('header-bar-container', HeaderBar);

export {
    HeaderBar
}
