import React from 'react';
import { Button, Title, Text, Filter } from '.';
import './Sidebar.scss';

export const Sidebar = props => {
  const {
    isAuth,
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
          <Filter
            filterData={filterData}
            submitLabel="Apply filter"
            onChange={(field, event) =>
              onSetFilterField(field, event.target.value)
            }
            onApplyFilter={event => onApplyFilter(event)}
          />
        </div>
      )}
    </div>
  );
};
