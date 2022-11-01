import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { receiveCoins, saveExpenses } from '../redux/actions';

function WalletForm(props) {
  const { dispatch } = props;
  // fetching and setting currencies for selection
  const [allCurrencies, setAllCurrencies] = useState(() => []);
  useEffect(() => {
    const fetchCoinsHere = async () => {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await request.json();
      const filteredData = Object.keys(data).filter((e) => e !== 'USDT');
      console.log(filteredData);
      dispatch(receiveCoins(filteredData));
      setAllCurrencies(filteredData);
    };
    fetchCoinsHere();
  }, [dispatch]);

  // controlling inputs
  const [amount, setAmount] = useState(() => '');
  const [description, setDescription] = useState(() => '');
  const [currency, setCurrency] = useState(() => 'USD');
  const [method, setMethod] = useState(() => 'Dinheiro');
  const [tag, setTag] = useState(() => 'Alimentação');

  // sending them to global state on button click
  const handleSaveExpense = async () => {
    const { stateExpense } = props;
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    const objExpense = {
      id: stateExpense.length === 0 ? 0 : stateExpense.length,
      value: amount,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };
    dispatch(saveExpenses(objExpense));
    console.log(objExpense);
    setAmount('');
    setDescription('');
    setCurrency('USD');
    setMethod('Dinheiro');
    setTag('Alimentação');
  };
  return (
    <section>
      <form>
        <label htmlFor="amount">
          <input
            data-testid="value-input"
            type="number"
            name="amount"
            id="amount"
            value={ amount }
            onChange={ (e) => setAmount(e.target.value) }
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
          />
        </label>
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ (e) => setCurrency(e.target.value) }

          >
            {allCurrencies
              .map((e) => <option key={ e } value={ e }>{e}</option>)}
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ (e) => setMethod(e.target.value) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ (e) => setTag(e.target.value) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ handleSaveExpense }
        >
          Adicionar despesa

        </button>
      </form>
    </section>

  );
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stateExpense: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  stateExpense: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
