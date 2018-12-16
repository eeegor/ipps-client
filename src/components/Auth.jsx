import React from 'react';
import { FormAuth } from '.';
import './Auth.scss';

export const Auth = props => {
  const { isAuth, showAuthForm, onSetFormAuthField, onSignup, onLogin } = props;

  if (showAuthForm === 'signup' && !isAuth) {
    return (
      <FormAuth
        type="signup"
        title="Signup"
        submitLabel="Signup"
        onChange={(field, event) =>
          onSetFormAuthField(field, event.target.value)
        }
        onSubmit={event => onSignup(event)}
      />
    );
  }

  if (showAuthForm === 'login' && !isAuth) {
    <FormAuth
      type="login"
      title="Login"
      submitLabel="Login"
      onChange={(field, event) => onSetFormAuthField(field, event.target.value)}
      onSubmit={event => onLogin(event)}
    />;
  }

  return null;
};
