import React from 'react';
import { Button, Title, Text, Filter } from '.';
import './Sidebar.scss';

export const Sidebar = props => {
  const {
    isAuth,
    onShowAuthForm,
    onSetFilterField,
    onApplyFilter,
    onLogout,
    filterData
  } = props;
  return (
    <div className="sidebar">
      {!isAuth && (
        <div className="info">You must be logged in to see this page :)</div>
      )}
      {isAuth && (
        <div className="sidebar__container">
          <Title text="IPPS Patient Data" />
          <Text text="Provider Summary for the Top 100 Diagnosis-Related Groups" />

          <hr />

          <div className="sidebar__actions">
            <Button
              className="button--logout button--outline"
              onClick={e => onLogout(e)}
            >
              Logout
            </Button>
          </div>

          <hr />
          {/* <div className="switch">
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
          </div> */}
          <Filter
            filterData={filterData}
            submitLabel="Apply filter"
            onChange={(field, event) =>
              onSetFilterField(field, event.target.value)
            }
            onApplyFilter={event => onApplyFilter(event)}
            onSubmit={event => onApplyFilter(event)}
          />
        </div>
      )}
    </div>
  );
};
