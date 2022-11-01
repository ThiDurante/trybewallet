import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { loginEvent } from '../redux/actions';

function Login(props) {
  const { dispatch } = props;
  const [email, setEmail] = useState(() => '');
  const [password, setPassword] = useState(() => '');
  const [enterBtn, setEnterBtn] = useState(() => true);

  // checks if button should be active
  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailCheck = emailRegex.test(email);
    const six = 6;
    const passwordCheck = password.length >= six;
    if (emailCheck && passwordCheck) {
      setEnterBtn(false);
    } else {
      setEnterBtn(true);
    }
  }, [email, password]);

  const handleLoginClick = () => {
    const { history } = props;
    dispatch(loginEvent(email));
    // dispatch(fetchCoins());
    history.push('/carteira');
  };

  return (

    <div>
      <form action="">
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            id="email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            id="password"
            onChange={ (e) => setPassword(e.target.value) }

          />
        </label>
        <button
          disabled={ enterBtn }
          type="button"
          onClick={ handleLoginClick }
        >
          Entrar

        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
