import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tests Login Page', () => {
  test('Checks if email and password are asked', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    const btn = screen.getByRole('button');

    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'teste@hotmail.com');
    userEvent.type(inputPassword, '123456');
    expect(btn).not.toBeDisabled();

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/carteira');
  });
});
