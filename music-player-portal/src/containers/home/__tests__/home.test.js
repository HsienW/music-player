import React from 'react';
import {render, screen} from '@testing-library/react';
import {decorator} from '../../../../../common/decorator/decorator';
import {HomeContainer} from '../home';


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

    const spy = jest.spyOn(decorator, 'before');

    it('should render container title into dom', () => {

        const home = new HomeContainer().render();
        expect(spy).toBeCalledWith('Rendering Todos...');
        // render(spy.before(<HomeContainer/>));
        // render(<Home/>);
        // const homeContainerTitle = screen.getByText('Featured');
        // expect(getByTestId('display_count').textContent).toBe('點了0下');
        // expect(homeContainerTitle).toBeInTheDocument();
    });
});


