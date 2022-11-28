import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './Header.css';
import { BiCoinStack } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../images/logo.svg';

function Header(props) {
  const { email, expenses } = props;
  const totalExpenses = expenses.length === 0 ? 0 : expenses.reduce((acc, curr) => {
    const coin = curr.currency;
    acc += +curr.value * +curr.exchangeRates[coin].ask;
    return acc;
  }, 0);
  return (
    <section className="header">
      <img src={ logo } alt="logo.png" />
      <div className="total">
        <BiCoinStack className="coin-icon" />
        <p className="total-sum-text" data-testid="total-field">
          Total de Despesas:
        </p>
        <p className="total-sum-number" data-testid="header-currency-field">
          R$
          {' '}
          {totalExpenses.toFixed(2)}
          BRL
        </p>
      </div>
      <div className="user-email">
        <FaUserCircle />
        <p data-testid="email-field">{email}</p>
      </div>
    </section>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.number,
    reduce: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);
