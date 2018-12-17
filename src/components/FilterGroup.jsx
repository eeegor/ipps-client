import React from 'react';
import './FilterGroup.scss';

export const FilterGroup = props => {
  const { name, label, value, placeholder, onChange, max, min = 1 } = props;
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
        inputMode="numeric"
        pattern="[0-9]*"
        id={name}
        name={name}
        min={min}
        max={max}
        defaultValue={value}
        placeholder={placeholder}
        onChange={event => onChange(name, event)}
      />
    </div>
  );
};
