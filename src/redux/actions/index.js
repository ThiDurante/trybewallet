// Coloque aqui suas actions
export const loginEvent = (email) => ({
  type: 'loginEvent',
  payload: email,
});

export const receiveCoins = (coins) => ({
  type: 'receivedCoins',
  payload: coins,
});

export const saveExpenses = (expense) => ({
  type: 'saveExpenses',
  payload: expense,
});

export const editExpenses = (expenses) => ({
  type: 'editExpense',
  payload: expenses,
});

export const removeExpenses = (expenses) => ({
  type: 'removeExpenses',
  payload: expenses,
});

export const editButton = (obj) => ({
  type: 'editButton',
  payload: obj,
});
