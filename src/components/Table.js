import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { TiEdit } from 'react-icons/ti';
import { TbTrash } from 'react-icons/tb';
import { editButton, removeExpenses } from '../redux/actions';
import './Table.css';

function Table(props) {
  const { expenses, dispatch } = props;

  const handleRemoveExpense = (element) => {
    const filteredExpenses = expenses.filter((expense) => expense.id !== element.id);
    dispatch(removeExpenses(filteredExpenses));
  };

  const handleEditExpense = (element) => {
    const obj = {
      el: element,
      active: true,
    };
    dispatch(editButton(obj));
  };

  return (
    <table className="table-container">
      <thead className="table-header">
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </thead>
      <tbody>
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
            <td className="buttons">
              <button
                type="button"
                data-testid="edit-btn"
                className="btn-edit"
                onClick={ () => handleEditExpense(e) }
              >
                <TiEdit />
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                className="btn-trash"
                onClick={ () => handleRemoveExpense(e) }
              >
                <TbTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
