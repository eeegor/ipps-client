import React from 'react';
import { FilterGroup, Button } from '.';
import './Filter.scss';

export const Filter = props => {
  const {
    title,
    filterData,
    onApplyFilter,
    onChange,
    onSubmit,
    submitLabel
  } = props;
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

  console.log('filterData', filterData);
  console.log('max_discharges', max_discharges);

  return (
    <div className="filter">
    <form onSubmit={(event) => onApplyFilter(event)}>
      {/* <FilterGroup 
          label="Per Page"
          name="per_page"
          max="30000"
          value={per_page}
          onChange={(type, event) => onChange(type, event)}
        />
        <FilterGroup 
          label="Page"
          name="page"
          value={page}
          onChange={(type, event) => onChange(type, event)}
        /> */}

      <FilterGroup
        label="Min Total Discharges"
        name="min_discharges"
        max="1000"
        value={min_discharges}
        onChange={(type, event) => onChange(type, event)}
      />
      <FilterGroup
        label="Max Total Discharges"
        name="max_discharges"
        max="1000"
        value={max_discharges}
        onChange={(type, event) => onChange(type, event)}
      />
      <FilterGroup
        label="Min Average Covered Charges"
        name="min_average_covered_charges"
        max="1000000"
        value={min_average_covered_charges}
        onChange={(type, event) => onChange(type, event)}
      />
      <FilterGroup
        label="Max Average Covered Charges"
        name="max_average_covered_charges"
        max="1000000"
        value={max_average_covered_charges}
        onChange={(type, event) => onChange(type, event)}
      />

      <FilterGroup
        label="Min Average Medicare Payment"
        name="min_average_medicare_payments"
        max="1000000"
        value={min_average_medicare_payments}
        onChange={(type, event) => onChange(type, event)}
      />
      <FilterGroup
        label="Max Average Medicare Payment"
        name="max_average_medicare_payments"
        max="1000000"
        value={max_average_medicare_payments}
        onChange={(type, event) => onChange(type, event)}
      />

      <div className="filter-group">
        <label htmlFor="provider_state" className="label">
          Provider State
        </label>
        {console.log('*** provider_state', provider_state)}
        <select
          name="provider_state"
          id="provider_state"
          defaultValue={provider_state}
          onChange={event => onChange('state', event)}
        >
          <option value="az">AZ</option>
          <option value="ca">CA</option>
          <option value="ny">NY</option>
          <option value="tx">TX</option>
          <option value="wa">WA</option>
        </select>
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
