import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Home} from '../containers/home/home';
import '../../../common/containers/auth/auth';
import './root.scss';

const Login = () => {
    return <auth-container/>;
};

export const PortalRootDom = (props) => {
    const {routerBase, setGlobalState, getGlobalState} = props;
    const defaultValue = getGlobalState('init');
    const [testValue, changeValue] = useState(defaultValue);

    const click = (handler) => {
        const newValue = Math.floor(Math.random() * 9) + 1;
        changeValue(newValue);
        console.log(getGlobalState('init'));
        return handler({init: newValue});
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route path={`${routerBase}/login`}>
                    <Login/>
                </Route>
                <Route path={`${routerBase}/home`}>
                    <Home/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
