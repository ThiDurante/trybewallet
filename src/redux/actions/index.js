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

export const editButton = (objToEdit) => ({
  type: 'editButton',
  payload: objToEdit,
});

export const saveEditButton = (objToEdit) => ({
  type: 'saveEditButton',
  payload: objToEdit,
});
