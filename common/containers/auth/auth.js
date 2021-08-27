import {navigationRoute} from '../../util';
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
        this.authFormSubtitle = document.createElement('div');
        this.authFormSubtitleAccount = document.createElement('div');
        this.authFormSubtitlePassWord = document.createElement('div');
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
        this.authFormSubtitleAccount.className = 'form-sub-title auth-text';
        this.authFormSubtitlePassWord.className = 'form-sub-title auth-text';
        this.authInputAccount.className = 'input';
        this.authInputPassword.className = 'input';
        this.authLoginButton.className = 'button';
        this.authDescription.className = 'description';
        this.authLoginButton.innerHTML = 'Login';
        this.authFormTitle.textContent = 'Music Player Demo'
        this.authFormSubtitle.textContent = 'If you don\'t have spotify authorization, can use'
        this.authFormSubtitleAccount.textContent = 'account: hpl18888@cuoly.com';
        this.authFormSubtitlePassWord.textContent = 'password: music-demo12345678';
        this.authDescription.textContent = 'This app only for demo, non-commercial use'

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
        this.authForm.appendChild(this.authFormSubtitleAccount);
        this.authForm.appendChild(this.authFormSubtitlePassWord);
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
        const account = this.querySelector('#input-account').value;
        const userInfo = {
            account: account ? account : 'default',
            userName: account ? account : 'default',
        };
        const authOriginURL = window.location.origin;
        const authRedirectURL = JSON.parse(sessionStorage.getItem('auth-redirect-url'));
        const authURL = `https://accounts.spotify.com/authorize?client_id=${process.env.AUTH_CLIENT_ID}&redirect_uri=${authOriginURL}${authRedirectURL}&response_type=token`;
        const authSpotify = window.open(authURL, 'spotifyAuth', 'width=400, height=600, left=200, top=200');

        // setTimeout(() => {
        //     const userInfo = {
        //         action: 'auth-spotify',
        //         account: account ? account : 'default',
        //         userName: account ? account : 'default',
        //         token: authSpotify.location.hash.substring(14)
        //     }
        //     authSpotify.opener.postMessage(userInfo, authOriginURL);
        //     authSpotify.close();
        //     navigationRoute(authRedirectURL);
        // },3000);

        const getAuth = setInterval(() => {
            const token = authSpotify.window.location.hash.substring(14);
            if (token !== undefined && token !== null) {
                sessionStorage.setItem('user-info', JSON.stringify(userInfo));
                sessionStorage.setItem('user-token', JSON.stringify(token));
                authSpotify.close();
                navigationRoute(authRedirectURL);
                clearInterval(getAuth);
            }
        }, 1000);

        // const getSpotifyToken = (authURL) => {
        //     return new Promise((resolve, reject) => {
        //         const authSpotify = window.open(authURL, 'spotifyAuth', 'width=400, height=600, left=200, top=200');
        //         const token = authSpotify.window.location.hash.substring(14);
        //         return [token, authSpotify];
        //     });
        // };
        //
        // (async function getAuth() {
        //     try {
        //         const [token, authSpotify] = await getSpotifyToken(authURL);
        //         sessionStorage.setItem('user-info', JSON.stringify(userInfo));
        //         sessionStorage.setItem('user-token', JSON.stringify(token));
        //         authSpotify.close();
        //         navigationRoute(authRedirectURL);
        //     } catch (error) {
        //         console.log(error)
        //     }
        // })();
    }
}

customElements.define('auth-container', Auth);

export {
    Auth
}
