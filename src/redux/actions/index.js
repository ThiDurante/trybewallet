// Coloque aqui suas actions
export const loginEvent = (email) => ({
  type: 'loginEvent',
  payload: email,
});

// placeholder for esLint
const requestCoinsStarted = () => ({
  type: 'requestCoinsStarted',
});

export const receiveCoins = (coins) => ({
  type: 'receivedCoins',
  payload: coins,
});

const errorCoins = (error) => ({
  type: 'errorCoins',
  payload: error,
});

export const saveExpenses = (expense) => ({
  type: 'saveExpenses',
  payload: expense,
});

export const fetchCoins = () => async (dispatch) => {
  try {
    dispatch(requestCoinsStarted());
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    dispatch(receiveCoins(response));
  } catch (error) {
    dispatch(errorCoins(error));
  }
};

// course
// export function fetchMovies() {
//   return (dispatch, _getState) => {
//     dispatch(requestMoviesStarted()); // dispatch da action 'REQUEST_MOVIES_STARTED'
//     return fetch('alguma-api-qualquer.com')
//       .then((response) => response.json())
//       .then((movies) => dispatch(receiveMovies(movies))); // dispatch da action 'RECEIVE_MOVIES'
//   };
// }
