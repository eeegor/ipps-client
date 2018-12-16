import React from 'react';
import { FilterGroup } from './FilterGroup';
import './Filter.scss';

export const Filter = props => {
  const { title, formData, onChange, onSubmit, submitLabel } = props;
  const per_page = (formData && formData.per_page) || '';
  const page = (formData && formData.page) || '';
  const min_discharges = (formData && formData.min_discharges) || '';
  const max_discharges = (formData && formData.max_discharges) || '';
  const min_average_covered_charges =
    (formData && formData.min_average_covered_charges) || '';
  const max_average_covered_charges =
    (formData && formData.max_average_covered_charges) || '';
  const min_average_medicare_payments =
    (formData && formData.min_average_medicare_payments) || '';
  const max_average_medicare_payments =
    (formData && formData.max_average_medicare_payments) || '';
  const provider_state = (formData && formData.provider_state) || '';

  return (
    <div className="filter">
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
      </div>
  );
};
