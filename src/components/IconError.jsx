import React from 'react';

export const IconError = props => {
  const { size = 240 } = props;

  return (
    <div className="icon icon--error">
      <svg
        height={height || size}
        viewBox="0 0 511 512"
        width="512pt"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m436.832031 75.441406c-49.53125-49.523437-114.96875-75.441406-180.40625-75.441406s-130.878906 25.917969-180.40625 75.441406c-100.691406 100.695313-100.691406 260.121094 0 360.8125 49.832031 49.828125 114.96875 75.746094 180.40625 75.746094s130.574219-25.917969 180.40625-75.746094c100.691407-100.691406 100.691407-260.117187 0-360.8125zm-318.488281 42.328125c38.125-37.824219 87.953125-58.335937 138.082031-58.335937 39.324219 0 78.945313 13.007812 113.167969 37.324218l-113.167969 113.164063-159.09375 159.09375c-56.34375-79.613281-48.085937-181.84375 21.011719-251.246094zm276.160156 276.160157c-38.121094 37.824218-87.949218 58.335937-138.078125 58.335937-39.324219 0-78.945312-13.007813-113.167969-37.324219l272.261719-272.257812c56.339844 79.609375 48.085938 181.839844-21.015625 251.246094zm0 0"
          fill="#ff4949"
        />
        <path d="m436.832031 436.253906c-49.832031 49.828125-114.96875 75.746094-180.40625 75.746094v-59.734375c50.128907 0 99.960938-20.511719 138.078125-58.335937 69.101563-69.40625 77.355469-171.636719 21.015625-251.246094l-159.09375 159.09375v-91.855469l113.164063-113.164063c-34.21875-24.316406-73.84375-37.324218-113.164063-37.324218v-59.433594c65.4375 0 130.875 25.917969 180.40625 75.441406 100.691407 100.695313 100.691407 260.121094 0 360.8125zm0 0" />
      </svg>
    </div>
  );
};