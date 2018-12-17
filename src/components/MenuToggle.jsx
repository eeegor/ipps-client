import React from 'react';
import './MenuToggle.scss';

export const MenuToggle = props => {
  const { onClick } = props;
  return (
    <div className="menu-toggle" onClick={event => onClick(event)}>
      Menu
    </div>
  );
};
