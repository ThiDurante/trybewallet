import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { receiveCoins } from '../redux/actions';

function WalletForm(props) {
  const [allCurrencies, setAllCurrencies] = useState(() => []);
  useEffect(() => {
    const fetchCoinsHere = async () => {
      const { dispatch } = props;
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await request.json();
      const filteredData = Object.keys(data).filter((e) => e !== 'USDT');
      console.log(filteredData);
      dispatch(receiveCoins(filteredData));
      setAllCurrencies(filteredData);
    };
    fetchCoinsHere();
  }, [props]);
  console.log(allCurrencies);
  return (
    <section>
      <form>
        <label htmlFor="amount">
          <input
            data-testid="value-input"
            type="number"
            name="amount"
            id="amount"
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
          />
        </label>
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
          >
            {allCurrencies
              .map((e) => <option key={ e } value={ e }>{e}</option>)}
          </select>
          <input
            data-testid="currency-input"
            type="select"
            name="currency"
            id="currency"
          />
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            name="method"
            id="method"
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
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    </section>

  );
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WalletForm);
