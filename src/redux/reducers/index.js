import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import editButton from './editButton';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  user,
  wallet,
  editButton,
});

export default rootReducer;
