import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './WalletForm.css';
import { connect } from 'react-redux';
import { editExpenses,
  receiveCoins, saveEditButton, saveExpenses } from '../redux/actions';

function WalletForm(props) {
  const { dispatch, editActive, editElement } = props;
  const alimentacao = 'Alimentação';
  // fetching and setting currencies for selection
  const [allCurrencies, setAllCurrencies] = useState(() => []);
  useEffect(() => {
    const fetchCoinsHere = async () => {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await request.json();
      const filteredData = Object.keys(data).filter((e) => e !== 'USDT');
      dispatch(receiveCoins(filteredData));
      setAllCurrencies(filteredData);
    };
    fetchCoinsHere();
  }, [dispatch]);

  // controlling inputs
  const [amount, setAmount] = useState('');
  const [description,
    setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState(alimentacao);

  useEffect(() => {
    if (editActive) {
      setAmount(editElement.value);
      setDescription(editElement.description);
      setCurrency(editElement.currency);
      setMethod(editElement.method);
      setTag(editElement.tag);
    }
  }, [editActive,
    editElement.currency,
    editElement.description,
    editElement.method,
    editElement.tag,
    editElement.value]);
  // sending them to global state on button click
  const { stateExpense } = props;
  const handleSaveExpense = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    // mounting obj after fetch
    const objExpense = {
      id: stateExpense.length === 0 ? 0 : stateExpense.length,
      value: amount,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };
    // dispatching it to globalState and reseting inputs
    dispatch(saveExpenses(objExpense));
    setAmount('');
    setDescription('');
    setCurrency('USD');
    setMethod('Dinheiro');
    setTag(alimentacao);
  };

  const handleEditExpense = () => {
    const index = stateExpense.indexOf(editElement);
    const objExpense = {
      id: editElement.id,
      value: amount,
      description,
      currency,
      method,
      tag,
      exchangeRates: stateExpense[index].exchangeRates,
    };
    const saveEdit = { active: false };
    stateExpense[index] = objExpense;
    // dispatching it to globalState and reseting inputs
    dispatch(editExpenses(stateExpense));
    dispatch(saveEditButton(saveEdit));
    setAmount('');
    setDescription('');
    setCurrency('USD');
    setMethod('Dinheiro');
    setTag(alimentacao);
  };

  return (
    <section className="form-container">
      <form className="form">
        <label className="description" htmlFor="description">
          Description
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
          />
        </label>
        <label className="category" htmlFor="tag">
          Category
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
        <label className="amount" htmlFor="amount">
          Amount
          <input
            data-testid="value-input"
            type="number"
            name="amount"
            id="amount"
            value={ amount }
            onChange={ (e) => setAmount(e.target.value) }
          />
        </label>
        <label className="method" htmlFor="method">
          Payment Method
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

        <label className="currency" htmlFor="currency">
          Currency
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
      </form>
      {editActive
        ? (
          <button
            type="button"
            className="btn"
            onClick={ handleEditExpense }
          >
            Editar despesa
          </button>)
        : (
          <button
            type="button"
            className="btn"
            onClick={ handleSaveExpense }
          >
            Adicionar despesa
          </button>
        )}
    </section>
  );
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editActive: PropTypes.bool.isRequired,
  editElement: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.number,
  }).isRequired,
  stateExpense: PropTypes.shape({
    indexOf: PropTypes.func,
    length: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  stateExpense: state.wallet.expenses,
  editActive: state.editButton.active,
  editElement: state.editButton.el,
});

export default connect(mapStateToProps)(WalletForm);
