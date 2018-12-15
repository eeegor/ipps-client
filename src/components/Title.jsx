import React from 'react';
import './Title.scss';

export const Title = props => {
  const { text } = props;
  return <h1 className="title">{text}</h1>;
};
