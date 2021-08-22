import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AllCategories} from '../containers/all-categories/all-categories';
import {CategoriesDetail} from '../containers/categories-detail/categories-detail';
import {Playlist} from '../containers/playlist/playlist';
import {Album} from '../containers/album/album';
import './root.scss';

export const CollectionRootDom = (props) => {
    const {routerBase, setGlobalState, getGlobalState, pubSub, pubSubKey} = props;
    // const defaultValue = getGlobalState('init');
    // const [testValue, changeValue] = useState(defaultValue);
    //
    // const click = (handler) => {
    //     const newValue = Math.floor(Math.random() * 9) + 1;
    //     changeValue(newValue);
    //     console.log(getGlobalState('init'));
    //     return handler({init: newValue});
    // };

    return (
        <BrowserRouter>
            <Switch>
                <Route path={`${routerBase}/all-categories`}>
                    <AllCategories
                        pubSub={pubSub}
                        pubSubKey={pubSubKey}
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                    />
                </Route>
                <Route path={`${routerBase}/categories-detail`}>
                    <CategoriesDetail
                        pubSub={pubSub}
                        pubSubKey={pubSubKey}
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                    />
                </Route>
                <Route path={`${routerBase}/playlist`}>
                    <Playlist
                        pubSub={pubSub}
                        pubSubKey={pubSubKey}
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                    />
                </Route>
                <Route path={`${routerBase}/album`}>
                    <Album
                        pubSub={pubSub}
                        pubSubKey={pubSubKey}
                        getGlobalState={getGlobalState}
                        setGlobalState={setGlobalState}
                    />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
