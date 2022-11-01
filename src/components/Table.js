import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Table(props) {
  const { expenses } = props;
  console.log(expenses);
  return (
    <section>
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
            <td />
          </tr>
        ))}
      </tbody>
    </section>
  );
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
