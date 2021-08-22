import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import './root.scss';

const SearchPage1 = () => {
    return <h2>Search Page1</h2>;
};

const SearchPage2 = () => {
    return <h2>Search Page2</h2>;
};

export const SearchRootDom = (props) => {
    const {routerBase, setGlobalState, getGlobalState} = props;
    const defaultValue = getGlobalState('init');
    const [testValue, changeValue] = useState(defaultValue);

    const click = (handler) => {
        const newValue = Math.floor(Math.random() * 5) + 1;
        changeValue(newValue);
        console.log(getGlobalState('init'));
        return handler({init: newValue});
    };

    console.log(getGlobalState('init'));

    return (
        <div>
            <div className='search-root-title'>Search root dom is working!</div>
            <div>test: {testValue}</div>
            <button onClick={() => click(setGlobalState)}>test</button>
            <BrowserRouter>
                <ul>
                    <li>
                        <Link to={`${routerBase}/search-page1`}>Search Page1</Link>
                    </li>
                    <li>
                        <Link to={`${routerBase}/search-page2`}>Search Page2</Link>
                    </li>
                    <li>
                        <Link to={'/portal/home'}>Go to Portal Home</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path={`${routerBase}/search-page1`}>
                        <SearchPage1/>
                    </Route>
                    <Route path={`${routerBase}/search-page2`}>
                        <SearchPage2/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

