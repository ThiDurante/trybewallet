import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tests Login Page', () => {
  test('Checks if expense is added', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button');

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    userEvent.type(inputEmail, 'teste@hotmail.com');
    userEvent.type(inputPassword, '123456');

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/carteira');

    expect(screen.getByText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByText(/tag/i)).toBeInTheDocument();
    expect(screen.getByText(/método de pagamento/i)).toBeInTheDocument();
    expect(screen.getByText(/câmbio/i)).toBeInTheDocument();

    const fifty = 50;
    const inputAmount = screen.getByLabelText(/amount/i);
    const inputDescription = screen.getByLabelText(/description/i);
    userEvent.type(inputAmount, fifty);
    userEvent.type(inputDescription, 'fifty');

    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addButton);

    const removeButton = await screen.findByRole('button', { name: /Excluir/i });
    userEvent.click(removeButton);
  });
  test('Checks component wallet', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button');

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    userEvent.type(inputEmail, 'teste@hotmail.com');
    userEvent.type(inputPassword, '123456');

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/carteira');

    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();

    // const fifty = 50;
    // const inputAmount = screen.getByLabelText(/amount/i);
    // const inputDescription = screen.getByLabelText(/description/i);
    // userEvent.type(inputAmount, fifty);
    // userEvent.type(inputDescription, 'fifty');

    // const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    // userEvent.click(addButton);

    // const removeButton = screen.getByRole('button', { name: /Excluir/i });
    // userEvent.click(removeButton);
  });
});
