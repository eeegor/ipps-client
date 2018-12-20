import React from 'react';
import { FormAuth } from '.';
import './Auth.scss';

export const Auth = props => {
  const {
    isAuth,
    showAuthForm,
    onSetFormAuthField,
    onSignup,
    onLogin,
    onGotoAuth
  } = props;

  if (showAuthForm === 'login' && isAuth === false) {
    return (
      <FormAuth
        type="login"
        title="Log in to existing account"
        submitLabel="Log in"
        onChange={(field, event) =>
          onSetFormAuthField(field, event.target.value)
        }
        onSubmit={event => onLogin(event)}
        onGotoAuth={(goto, event) => onGotoAuth(goto, event)}
      />
    );
  }

  return (
    <FormAuth
      type="signup"
      title="Create a new account"
      submitLabel="Sign up"
      onChange={(field, event) => onSetFormAuthField(field, event.target.value)}
      onSubmit={event => onSignup(event)}
      onGotoAuth={(goto, event) => onGotoAuth(goto, event)}
    />
  );
};
