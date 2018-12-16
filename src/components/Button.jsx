import React from 'react';
import './Button.scss';

export const Button = props => {
  const { className, color, children, onClick } = props;
  return (
    <button
      onClick={onClick && onClick}
      className={`button ${className && className} ${color &&
        `button--${color}`}`}
    >
      {children}
    </button>
  );
};
