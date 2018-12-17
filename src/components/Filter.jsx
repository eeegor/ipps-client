import React from 'react';
import { FilterGroup, Button } from '.';
import './Filter.scss';

export const Filter = props => {
  const { filterData, onApplyFilter, onChange } = props;
  const per_page = (filterData && filterData.per_page) || '';
  const page = (filterData && filterData.page) || '';
  const min_discharges = (filterData && filterData.min_discharges) || '';
  const max_discharges = (filterData && filterData.max_discharges) || '';
  const min_average_covered_charges =
    (filterData && filterData.min_average_covered_charges) || '';
  const max_average_covered_charges =
    (filterData && filterData.max_average_covered_charges) || '';
  const min_average_medicare_payments =
    (filterData && filterData.min_average_medicare_payments) || '';
  const max_average_medicare_payments =
    (filterData && filterData.max_average_medicare_payments) || '';
  const provider_state = (filterData && filterData.state) || '';

  return (
    <div className="filter">
      <form onSubmit={event => onApplyFilter(event)}>
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
          <input
            className="input input--text"
            name="provider_state"
            id="provider_state"
            defaultValue={provider_state}
            placeholder="e.g. NY"
            onChange={event => onChange('state', event)}
          />
        </div>

        <div className="filter__apply">
          <Button color="success" onClick={event => onApplyFilter(event)}>
            Apply Filter
          </Button>
        </div>
      </form>
    </div>
  );
};
