import React from 'react';
import { Button, Title, Text, Filter } from '.';
import './Sidebar.scss';

export const Sidebar = props => {
  const {
    isAuth,
    onShowAuthForm,
    onSetFilterField,
    onApplyFilter,
    onLogout
  } = props;
  return (
    <div className="sidebar">
      {!isAuth && (
        <>
          <Button onClick={e => onShowAuthForm('signup', e)}>Sign up</Button>
          <Button onClick={e => onShowAuthForm('login', e)}>Login</Button>
        </>
      )}
      {isAuth && (
        <div>
          <Title text="IPPS Patient Data" />
          <Text text="Provider Summary for the Top 100 Diagnosis-Related Groups" />
          <div className="switch">
            <div className="switch__title">
              <h3>View Mode</h3>
            </div>
            <div className="switch__cells grid--2">
              <div className="switch__cell">Table</div>
              <div className="switch__cell">Chart</div>
            </div>
          </div>

          <div className="switch">
            <div className="switch__title">
              <h3>Data</h3>
            </div>
            <div className="switch__cells grid--2">
              <div className="switch__cell">Load All Data</div>
              <div className="switch__cell">Select Columns</div>
            </div>
          </div>

          <button className="button button--logout" onClick={e => onLogout(e)}>
            Logout
          </button>
          <Filter
            submitLabel="Apply filter"
            onChange={(field, event) =>
              onSetFilterField(field, event.target.value)
            }
            onSubmit={event => onApplyFilter(event)}
          />
        </div>
      )}
    </div>
  );
};
