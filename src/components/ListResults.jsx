import React from 'react';
import './ListResults.scss';

export const ListResults = props => {
  const { currentCount, totalCount, currentPage, perPage } = props;
  const totalPages = Math.ceil(currentCount / perPage) || 1;
  const numberPlaceholder = '---';
  const formatNumber = value => parseInt(value, 10).toLocaleString();
  return (
    <div className="list-results">
      <h1 className="list-results__title">
        <b className="list-results__current-count">
          {!!currentCount ? formatNumber(currentCount) : numberPlaceholder}
        </b>
        {' / '}
        <b className="list-results__total-count">
          {!!totalCount ? formatNumber(totalCount) : numberPlaceholder}
        </b>{' '}
        Results
      </h1>
      <p className="list-results__info">
        <span className="info-block">
          <span className="list-results__page">Page:</span>
          <span className="list-results__pages">
            <b className="list-results__current-page">
              {(!!currentPage && formatNumber(currentPage)) ||
                numberPlaceholder}
            </b>
            {' / '}
            <b className="list-results__total-pages">
              {(!!currentCount && !!totalCount && (formatNumber(totalPages) || 1)) ||
                numberPlaceholder}
            </b>
          </span>
        </span>
        <span className="info-block">
          <span>Per page:</span>
          <span>
            <b>{(!!perPage && formatNumber(perPage)) || numberPlaceholder}</b>
          </span>
        </span>
      </p>
    </div>
  );
};
