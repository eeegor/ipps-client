import React from 'react';
import './IconInfiniteSymbol.scss';

export const IconInfiniteSymbol = props => {
  const { color = '#29c', height, width, size = 240 } = props;

  return (
    <div className="icon icon--infinite-symbol">
      <svg
        height={height || size}
        width={width || size}
        version="1.1"
        id="icon-infinite-symbol"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 405.747 405.747"
        xmlSpace="preserve"
      >
        <g>
          <path
            fill={color}
            d="M310.277,107.305c-43.976,0-92.099,63.076-107.475,84.968
		c-15.52-22.071-63.487-84.771-107.332-84.771c-52.64,0-95.47,42.83-95.47,95.47s42.83,95.47,95.47,95.47
		c43.976,0,92.099-63.076,107.475-84.968c15.52,22.071,63.488,84.771,107.332,84.771c52.64,0,95.47-42.83,95.47-95.47
		S362.917,107.305,310.277,107.305z M95.47,286.508c-46.064,0-83.536-37.472-83.536-83.536s37.472-83.536,83.536-83.536
		c40.509,0,89.384,67.766,100.214,83.536C184.854,218.742,135.979,286.508,95.47,286.508z M310.277,286.311
		c-40.509,0-89.384-67.766-100.214-83.536c10.824-15.77,59.704-83.536,100.214-83.536c46.064,0,83.536,37.472,83.536,83.536
		S356.341,286.311,310.277,286.311z"
          />
        </g>
      </svg>
    </div>
  );
};
