import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
  const { email, expenses } = props;
  const totalExpenses = expenses.length === 0 ? 0 : expenses.reduce((acc, curr) => {
    const coin = curr.currency;
    acc += +curr.value * +curr.exchangeRates[coin].ask;
    return acc;
  }, 0);
  return (
    <section>
      <p data-testid="header-currency-field">BRL</p>
      <p data-testid="total-field">{totalExpenses.toFixed(2)}</p>
      <p data-testid="email-field">{email}</p>
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
