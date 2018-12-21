import React from 'react';
import './Errors.scss';
import { guid } from '../util';

export const Errors = props => {
  const { errors } = props;
  return (
    <div className="errors">
      {errors.map(error => {
        const data = error.response && error.response.data || {};
        const message = data.message;
        const name = data.name;
        const dataErrors = data.errors;
        const code = data.code;

        if (message && !dataErrors) {
          return <div className="error">{`${message} `}</div>;
        }

        if (typeof data === 'string' && data !== '') {
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
            {dataErrors &&
              Object.keys(dataErrors).map(errorName => {
                const properties = dataErrors[errorName].properties;
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
