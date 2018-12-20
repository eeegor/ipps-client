import React from 'react';
import classnames from 'classnames';
import './MenuToggle.scss';

export const MenuToggle = props => {
  const { className, onClick, isOpen } = props;
  const classNames = classnames(
    'menu-toggle',
    className,
    isOpen && `menu-toggle--open`
  );
  return (
    <button className={classNames} onClick={event => onClick(event)}>
      {isOpen ? 'Close' : 'Menu'}
    </button>
  );
};
