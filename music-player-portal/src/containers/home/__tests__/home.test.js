import React from 'react';
import {render} from '@testing-library/react';
import {Home} from '../home';
import {authLoginChecker} from "../../../util";
// const decorator = require('../../../../../common/decorator/decorator');
// import 'common/decorator/decorator';
// import {decorator} from '../../../../../common/decorator/decorator';

// jest.requireMock('decorator');

// jest.mock('test', () => {
//     const test = jest.requireActual('../../../../../common/decorator/decorator');
//     return {
//         ...test,
//     };
// });

jest.spyOn({}, 'decorator');

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
        const mockAuthLoginChecker = jest.fn();
        const {getByTestId} = render(Home);
        // expect(getByTestId('home-container-title')).toHaveTextContent('Featured');
    });
});


