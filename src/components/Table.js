import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { removeExpenses } from '../redux/actions';

function Table(props) {
  const { expenses, dispatch } = props;

  const handleRemoveExpense = (element) => {
    console.log(element);
    const filteredExpenses = expenses.filter((expense) => expense.id !== element.id);
    console.log(filteredExpenses);
    // let count = 0;
    // const resolveIdExpenses = filteredExpenses.map((expence) => {
    //   expence.id = count;
    //   count += 1;
    //   return expence;
    // });
    // console.log(resolveIdExpenses);
    dispatch(removeExpenses(filteredExpenses));
  };

  return (
    <tbody>
      <th>Descrição</th>
      <th>Tag</th>
      <th>Método de pagamento</th>
      <th>Valor</th>
      <th>Moeda</th>
      <th>Câmbio utilizado</th>
      <th>Valor convertido</th>
      <th>Moeda de conversão</th>
      <th>Editar/Excluir</th>
      {expenses.map((e) => (
        <tr key={ e.id }>
          <td>{e.description}</td>
          <td>{e.tag}</td>
          <td>{e.method}</td>
          <td>{(+e.value).toFixed(2)}</td>
          <td>{e.exchangeRates[e.currency].name}</td>
          <td>{(+e.exchangeRates[e.currency].ask).toFixed(2)}</td>
          <td>{(+e.value * +e.exchangeRates[e.currency].ask).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => handleRemoveExpense(e) }
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
