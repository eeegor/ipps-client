import React from 'react';
import './Errors.scss';
import { guid } from '../util';

const Error = props => <div className="error">{props.error}</div>;

export const Errors = props => {
  const { errors } = props;
  return (
    <div className="errors">
      {errors.map(error => {
        if (error.message) {
          const { response } = error;
          const nestedType =
            (response && response.data && response.data.message) || null;
          const nestedMessage =
            (response && response.data && response.data.error.message) || null;
          if (nestedType) {
            if (nestedMessage) {
              return <Error key={guid()} error={nestedMessage} />;
            }
            return <Error key={guid()} error={nestedType} />;
          }
          switch (error.message) {
            case 'Request failed with status code 400':
              const serverError = 'Server error, please try again';
              return <Error key={guid()} error={serverError} />;
            case 'Request failed with status code 401':
              const notAuthorized =
                'You need to be authenticated to view this page';
              return <Error key={guid()} error={notAuthorized} />;
            case 'Network Error':
              const message = error.message;
              return <Error key={guid()} error={message} />;
            case 'Validation Error':
              return <Error key={guid()} error={error.error} />;
            default:
              const defaultMessage = 'Something went wrong, please try again';
              return <Error key={guid()} error={defaultMessage} />;
          }
        }

        // return <div key={guid()} className="error">{nextError.message}</div>;
        // const name = data.name;
        // const dataErrors = data.errors;
        // const code = data.code;

        // if (message && !dataErrors) {
        //   return <div className="error">{`${message} `}</div>;
        // }

        // if (typeof data === 'string' && data !== '') {
        //   return <div className="error">{`${data} `}</div>;
        // }

        // return (
        //   <div className="error-wrap" key={guid()}>
        //     {name && code && (
        //       <div className="error">
        //         {code !== 11000 && `code: ${code}`}
        //         {code === 11000 && `This user already exists`}
        //       </div>
        //     )}
        //     {dataErrors &&
        //       Object.keys(dataErrors).map(errorName => {
        //         const properties = dataErrors[errorName].properties;
        //         return (
        //           <div className="error" key={errorName}>
        //             {properties.minlength &&
        //               `${properties.path}, min length: ${properties.minlength}`}
        //             {!properties.minlength &&
        //               properties.path &&
        //               `${properties.path} is required`}
        //           </div>
        //         );
        //       })}
        //   </div>
        // );
      })}
    </div>
  );
};
