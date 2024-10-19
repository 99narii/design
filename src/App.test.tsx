import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders 시작 button', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    const buttonElement = screen.getByText(/시작/i);
    expect(buttonElement).toBeInTheDocument();
});
