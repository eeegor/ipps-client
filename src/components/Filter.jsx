import React from 'react';
import { FilterGroup } from '.';
import './Filter.scss';

export const Filter = props => {
  const { filterData, onChange, filterMeta, onSubmit } = props;
  const {
    page,
    per_page,
    min_discharges,
    max_discharges,
    min_average_covered_charges,
    max_average_covered_charges,
    min_average_medicare_payments,
    max_average_medicare_payments,
    provider_state
  } = filterData;

  return (
    <div className="filter">
      <form onSubmit={event => onSubmit(event)}>
        <div className="filter__filter-group filter__page-controls">
          <FilterGroup
            label="Per Page"
            name="per_page"
            max="30000"
            value={per_page}
            placeholder="100"
            onChange={(type, event) => onChange(type, event)}
          />
          <FilterGroup
            label="Page"
            name="page"
            value={page}
            placeholder="1"
            onChange={(type, event) => onChange(type, event)}
          />
        </div>

        <hr />

        <div className="filter__filter-group">
          <FilterGroup
            label="Min Total Discharges"
            name="min_discharges"
            max="1000"
            value={min_discharges}
            placeholder="1"
            onChange={(type, event) => onChange(type, event)}
          />
          <FilterGroup
            label="Max Total Discharges"
            name="max_discharges"
            max="1000"
            value={max_discharges}
            placeholder="1000"
            onChange={(type, event) => onChange(type, event)}
          />
        </div>

        <hr />

        <div className="filter__filter-group">
          <FilterGroup
            label="Min Average Covered Charges"
            name="min_average_covered_charges"
            max="1000000"
            placeholder="1"
            value={min_average_covered_charges}
            onChange={(type, event) => onChange(type, event)}
          />
          <FilterGroup
            label="Max Average Covered Charges"
            name="max_average_covered_charges"
            max="1000000"
            placeholder="1000000"
            value={max_average_covered_charges}
            onChange={(type, event) => onChange(type, event)}
          />
        </div>

        <hr />

        <div className="filter__filter-group">
          <FilterGroup
            label="Min Average Medicare Payment"
            name="min_average_medicare_payments"
            max="1000000"
            placeholder="1"
            value={min_average_medicare_payments}
            onChange={(type, event) => onChange(type, event)}
          />
          <FilterGroup
            label="Max Average Medicare Payment"
            name="max_average_medicare_payments"
            max="1000000"
            placeholder="1000000"
            value={max_average_medicare_payments}
            onChange={(type, event) => onChange(type, event)}
          />
        </div>

        <hr />

        <div className="filter-group">
          <label htmlFor="provider_state" className="label">
            Provider State
          </label>
          <div className="select-custom">
            <select
              className="select"
              onChange={event => onChange('provider_state', event)}
              name="provider_state"
              id="provider_state"
              value={provider_state}
            >
              <option value="">Select state</option>
              {filterMeta &&
                filterMeta.providers.providerStates.map(unit => {
                  return (
                    <option key={unit} value={unit}>
                      {unit.toUpperCase()}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <input className="filter__hidden-submit" type="submit" />
      </form>
    </div>
  );
};
