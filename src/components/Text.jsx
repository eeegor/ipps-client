import React from 'react';
import './Text.scss';

export const Text = props => {
  const { text, children } = props;
  return <p className="text">{text || children}</p>;
};
