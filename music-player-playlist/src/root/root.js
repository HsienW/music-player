import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Album } from '../containers/album/album';
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
        <>
            <div className='playlist-root-title'>Playlist root dom is working!</div>
            <BrowserRouter>
                <Switch>
                    <Route path={`${routerBase}/album`}>
                        <Album/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
};
