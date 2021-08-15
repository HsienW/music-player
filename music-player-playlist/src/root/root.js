import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Album} from '../containers/album/album';
import './root.scss';

export const PlaylistRootDom = (props) => {
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
                <Route path={`${routerBase}/album`}>
                    <Album/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
