// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'loginEvent':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
