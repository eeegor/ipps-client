import React from 'react';
import './Errors.scss';
import { guid } from '../util';

export const Errors = props => {
  const { errors } = props;
  return (
    <div className="errors">
      {errors.map(error => {
        const data = error.response.data || '';
        const message = data.message;
        const name = data.name;
        const errors = data.errors;
        const code = data.code;

        if (message && !errors) {
          return <div className="error">{`${message} `}</div>;
        }

        if (typeof data === 'string') {
          return <div className="error">{`${data} `}</div>;
        }

        return (
          <div className="error-wrap" key={guid()}>
            {name && code && (
              <div className="error">
                {code !== 11000 && `code: ${code}`}
                {code === 11000 && `This user already exists`}
              </div>
            )}
            {errors &&
              Object.keys(errors).map(errorName => {
                const properties = errors[errorName].properties;
                return (
                  <div className="error" key={errorName}>
                    {properties.minlength &&
                      `${properties.path}, min length: ${properties.minlength}`}
                    {!properties.minlength &&
                      properties.path &&
                      `${properties.path} is required`}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};
