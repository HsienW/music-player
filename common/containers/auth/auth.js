import {routeNavigation} from '../../util/route-navigation';
import {authStyle} from './auth-style';

class Auth extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.domStyling();
        this.domRender();
        this.domEventInit();
    }

    domStyling() {
        let style = document.createElement('style');
        style.textContent = authStyle;
        this.shadow.appendChild(style);
    }

    domRender() {
        this.authBody = document.createElement('div');
        this.authPage = document.createElement('div');
        this.authFormViewport = document.createElement('div');
        this.authFormTitle = document.createElement('div');
        this.authFormSubtitle = document.createElement('p');
        this.authForm = document.createElement('div');
        this.authInputAccount = document.createElement('input');
        this.authInputPassword = document.createElement('input');
        this.authLoginButton = document.createElement('button');
        this.authDescription = document.createElement('p');

        this.authBody.className = 'auth-backdrop';
        this.authPage.className = 'auth-page';
        this.authFormViewport.className = 'form';
        this.authFormTitle.className = 'form-title';
        this.authFormSubtitle.className = 'form-sub-title';
        this.authInputAccount.className = 'input';
        this.authInputPassword.className = 'input';
        this.authLoginButton.className = 'button';
        this.authDescription.className = 'description';
        this.authLoginButton.innerHTML = 'Login';
        this.authFormTitle.textContent = 'React Micro Starter'
        this.authFormSubtitle.textContent = 'You can enter any account and password!'
        this.authDescription.textContent = 'This description'

        this.authInputAccount.setAttribute('type', 'text');
        this.authInputPassword.setAttribute('type', 'password');

        this.authInputAccount.setAttribute('placeholder', 'Account');
        this.authInputPassword.setAttribute('placeholder', 'Password');

        this.authInputAccount.setAttribute('id', 'input-account');
        this.authInputPassword.setAttribute('id', 'input-password');

        this.shadow.appendChild(this.authBody);
        this.authBody.appendChild(this.authPage);
        this.authPage.appendChild(this.authFormViewport);
        this.authFormViewport.appendChild(this.authForm);
        this.authForm.appendChild(this.authFormTitle);
        this.authForm.appendChild(this.authFormSubtitle);
        this.authForm.appendChild(this.authInputAccount);
        this.authForm.appendChild(this.authInputPassword);
        this.authForm.appendChild(this.authLoginButton);
        this.authForm.appendChild(this.authDescription);
    }

    domEventInit() {
        this.authInputAccount.addEventListener('input', (event) => {
            this.authInputAccount.textContent = event.target.value;
        }, false);
        this.authInputPassword.addEventListener('input', (event) => {
            this.authInputPassword.textContent = event.target.value;
        }, false);
        this.authLoginButton.addEventListener('click', this.login.bind(this.authForm), false);
    }

    login() {
        console.log(this.querySelector('#input-account').value);
        console.log(this.querySelector('#input-password').value);
        const account = this.querySelector('#input-account').value;
        const userInfo = {
            account: account ? account : 'default',
            userName: account ? account : 'default',
            token: 'default-token'
        };
        sessionStorage.setItem('user-info', JSON.stringify(userInfo));

        const authOriginURL = window.location.origin;
        const authRedirectURL = JSON.parse(sessionStorage.getItem('auth-redirect-url'));
        const authURL = `https://accounts.spotify.com/authorize?client_id=${process.env.AUTH_CLIENT_ID}&redirect_uri=${authOriginURL}${authRedirectURL}&response_type=token`;

        console.log('vvvvvvvvvvvvvvvvvvv');
        console.log(process.env.AUTH_CLIENT_ID);
        console.log(window.location.origin);
        console.log(window.location);
        console.log(authURL);
        console.log(authRedirectURL);

        const spotifyAuth = window.open(authURL, 'spotifyAuth', 'width=400, height=600, left=200, top=200');

        const getAuth = setInterval(() => {
            const token = spotifyAuth.window.location.hash.substring(14);

            console.log('驗證成功驗證成功驗證成功驗證成功驗證成功');
            console.log(token);

            if (token !== undefined && token !== null) {
                // WebStorage.setSessionStorage(WebStorageKeys.TOKEN, token);
                spotifyAuth.close();
                clearInterval(getAuth);
            }
        }, 500);

        routeNavigation(authRedirectURL);
    }
}

customElements.define('auth-container', Auth);

export {
    Auth
}
