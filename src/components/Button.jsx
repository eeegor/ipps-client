import React from 'react';
import classnames from 'classnames';
import './Button.scss';

export const Button = props => {
  const { className, color, children, onClick } = props;
  const classNames = classnames( 'button', className, color && `button--${color}`);
  return (
    <button
      onClick={onClick && onClick}
      className={classNames}
    >
      {children}
    </button>
  );
};
