import React from 'react';
import {render} from '@testing-library/react';
import {Home} from '../home';
// import {decorator} from '../../../../../common/decorator/decorator';

const authLoginChecker = jest.fn(() => {});

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');

    const Divider = ({children}) => {
        return <div/>;
    };
    const Skeleton = ({children}) => {
        return <div/>;
    };
    return {
        ...antd,
        Divider,
        Skeleton,
    };
});

describe('home container testing', () => {
    it('should render container title into dom', () => {
        const {getByTestId} = render(Home);
        expect(getByTestId('home-container-title').textContent).toBe('Featured');
    });
});


