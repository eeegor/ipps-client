import React from 'react';
import './FilterGroup.scss';

export const FilterGroup = props => {
  const { name, label, value, onChange, max, min = 1 } = props;
  return (
    <div className="filter-group">
      {label && (
        <label className="label" htmlFor="per_page">
          {label}
        </label>
      )}
      <input
        className="input"
        type="number"
        id={name}
        name={name}
        min={min}
        max={max}
        defaultValue={value}
        onChange={event => onChange(name, event)}
      />
    </div>
  );
};
