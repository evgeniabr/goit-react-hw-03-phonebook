import React from 'react';
import PropTypes from 'prop-types';

export function Filter({ handleChange, value }) {
  return (
    <div>
      <p>Find contacts by name</p>
      <input type="text" name="filter" value={value} onChange={handleChange} />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
