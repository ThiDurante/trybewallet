// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'receivedCoins':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'saveExpenses':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  case 'editExpense':
    return {
      ...state,
      expenses: [
        ...action.payload,
      ],
    };
  case 'removeExpenses':
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
