import React from 'react';
import './Sidebar.scss';

export const Sidebar = props => {
  const { isAuth, children } = props;
  return (
    <div className="sidebar">
      {!isAuth && (
        <div className="info">You must be logged in to see this page :)</div>
      )}
      {isAuth && <div className="sidebar__container">{children}</div>}
    </div>
  );
};
