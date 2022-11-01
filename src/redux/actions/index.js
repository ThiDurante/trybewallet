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

export const removeExpenses = (expenses) => ({
  type: 'removeExpenses',
  payload: expenses,
});
