import React from 'react';
import {render, screen} from '@testing-library/react';
import {Home} from '../home';

describe('home container testing', () => {
    it('should render container title into dom', () => {
        render(<Home />);
        // render(<Home/>);
        const homeContainerTitle = screen.getByText('Featured');
        // expect(getByTestId('display_count').textContent).toBe('點了0下');
        expect(homeContainerTitle).toBeInTheDocument();
    });
});
