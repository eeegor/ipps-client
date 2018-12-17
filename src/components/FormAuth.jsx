import React from 'react';
import { Button } from '.';
import './FormAuth.scss';

export const FormAuth = props => {
  const {
    title,
    type,
    formData,
    submitLabel,
    onChange,
    onSubmit,
    onGotoAuth
  } = props;
  const email = (formData && formData.email) || '';
  const password = (formData && formData.password) || '';
  let formType = (type === 'login' && type) || 'signup';

  return (
    <div className={`form-auth form-auth--${formType}`}>
      <form className="form-auth__form" onSubmit={event => onSubmit(event)}>
        {title && (
          <div className="form-auth__title">
            <h2>{title}</h2>
          </div>
        )}
        <div className="form-auth__input-group">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input input--email"
            id="email"
            name="email"
            type="text"
            defaultValue={email}
            onChange={event => onChange('email', event)}
          />
        </div>

        <div className="form-auth__input-group">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input input--password"
            id="password"
            name="password"
            type="password"
            defaultValue={password}
            onChange={event => onChange('password', event)}
          />
        </div>

        <div className="form-auth__submit-group">
          <Button className="submit" type="submit">
            {submitLabel || 'Submit'}
          </Button>
        </div>

        <div className="form-auth__links-group">
          <a
            className="link"
            onClick={event =>
              onGotoAuth(formType === 'signup' ? 'login' : 'signup', event)
            }
          >
            {`Go to ${formType === 'signup' ? 'Login' : 'Signup'} instead`}
          </a>
        </div>
      </form>
    </div>
  );
};
