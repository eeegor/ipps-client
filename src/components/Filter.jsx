import React from 'react';
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
      <div className="filter-group">
        <label className="label">Paging:</label>
        <div className="min-group">
          <label className="label" htmlFor="per_page">
            Per Page
          </label>
          <input
            className="input"
            type="number"
            id="per_page"
            name="per_page"
            min="1"
            max="30000"
            defaultValue={per_page}
            onChange={event => onChange('per_page', event)}
          />
        </div>
        <div className="max-group">
          <label className="label" htmlFor="page">
            Page
          </label>
          <input
            className="input"
            type="number"
            id="page"
            name="page"
            min="1"
            defaultValue={page}
            onChange={event => onChange('page', event)}
          />
        </div>
      </div>
      <div className="filter-group">
        <label className="label">Total Discharges:</label>
        <div className="min-group">
          <label className="label" htmlFor="min_discharges">
            Min
          </label>
          <input
            className="input"
            type="number"
            id="min_discharges"
            name="min_discharges"
            min="0"
            max="1000"
            defaultValue={min_discharges}
            onChange={event => onChange('min_discharges', event)}
          />
        </div>
        <div className="max-group">
          <label className="label" htmlFor="max_discharges">
            Max
          </label>
          <input
            className="input"
            type="number"
            id="max_discharges"
            name="max_discharges"
            min="0"
            max="1000"
            defaultValue={max_discharges}
            onChange={event => onChange('max_discharges', event)}
          />
        </div>
      </div>
      <div className="filter-group">
        <label className="label">Average Covered Charges:</label>
        <div className="min-group">
          <label className="label" htmlFor="min_average_covered_charges">
            Min
          </label>
          <input
            className="input"
            type="number"
            id="min_average_covered_charges"
            name="min_average_covered_charges"
            min="0"
            max="1000000"
            defaultValue={min_average_covered_charges}
            onChange={event => onChange('min_average_covered_charges', event)}
          />
        </div>
        <div className="max-group">
          <label className="label" htmlFor="max_average_covered_charges">
            Max
          </label>
          <input
            className="input"
            type="number"
            id="max_average_covered_charges"
            name="max_average_covered_charges"
            min="0"
            max="1000000"
            defaultValue={max_average_covered_charges}
            onChange={event => onChange('max_average_covered_charges', event)}
          />
        </div>
      </div>
      <div className="filter-group">
        <label className="label">Average Medicare Payment:</label>
        <div className="min-group">
          <label className="label" htmlFor="min_average_medicare_payments">
            Min
          </label>
          <input
            className="input"
            type="number"
            id="min_average_medicare_payments"
            name="min_average_medicare_payments"
            min="0"
            max="1000000"
            defaultValue={min_average_medicare_payments}
            onChange={event => onChange('min_average_medicare_payments', event)}
          />
        </div>
        <div className="max-group">
          <label className="label" htmlFor="max_average_medicare_payments">
            Max
          </label>
          <input
            className="input"
            type="number"
            id="max_average_medicare_payments"
            name="max_average_medicare_payments"
            min="0"
            max="1000000"
            defaultValue={max_average_medicare_payments}
            onChange={event => onChange('max_average_medicare_payments', event)}
          />
        </div>
      </div>
      <div className="filter-group">
        <label htmlFor="provider_state" className="label">
          Provider State
        </label>
        <select
          name="provider_state"
          id="provider_state"
          defaultValue={provider_state}
          onChange={event => onChange('provider_state', event)}
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
