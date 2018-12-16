import React from 'react';

export const IconBatteryEmpty = props => {
  const { size = 240 } = props;

  return (
    <div className="icon icon-battery-empty">
      <svg
        height={size}
        width={size}
        version="1.1"
        id="icon-battery-empty"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 452.267 452.267"
        xmlSpace="preserve"
      >
        <g>
          <path
            style={{ fill: '#F05228' }}
            d="M0,119.467V332.8h426.667V119.467H0z M401.067,307.2H25.6V145.067h375.467V307.2z"
          />
          <rect
            x="51.2"
            y="170.667"
            style={{ fill: '#F05228' }}
            width="25.6"
            height="110.933"
          />
          <rect
            x="426.667"
            y="170.667"
            style={{ fill: '#F05228' }}
            width="25.6"
            height="110.933"
          />
        </g>
      </svg>
    </div>
  );
};
