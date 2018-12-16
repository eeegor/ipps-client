import React from 'react';
import './Button.scss';

export const Button = props => {
  const { className, color, children } = props;
  return (
    <button
      className={`button ${className && className} ${color &&
        `button--${color}`}`}
    >
      {children}
    </button>
  );
};
