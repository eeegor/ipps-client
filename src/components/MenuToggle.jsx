import React from 'react';
import './MenuToggle.scss';

export const MenuToggle = props => {
  const { onClick, isOpen } = props;
  return (
    <div
      className={`menu-toggle${isOpen ? ' menu-toggle--open' : ''}`}
      onClick={event => onClick(event)}
    >
      {isOpen ? 'X' : 'Menu'}
    </div>
  );
};
