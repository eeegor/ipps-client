import React from 'react';
import './Text.scss';

export const Text = props => {
  const { text } = props;
  return <p className="text">{text}</p>;
};
