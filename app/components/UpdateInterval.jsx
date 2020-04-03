import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { changeInterval } from '../services/tickerService';

const timeValues = [500, 1000, 5000, 10000];

export const UpdateInterval = ({ ticker }) => {
    const selectedValue = useRef(null);
    const dropdown = useRef(null);

    const dropdownChangeState = () => {
        const isOpen = dropdown.current.classList.contains('open');
        const oldClass = isOpen ? 'open' : 'collapsed';
        const newClass = isOpen ? 'collapsed' : 'open';

        dropdown.current.classList.remove(oldClass);
        dropdown.current.classList.add(newClass);
    };

    const dropdownItemClick = value => {
        changeInterval(value);
        selectedValue.current.innerText = `${value / 1000} sec`;
        dropdownChangeState();
    };

    return (
    <div className="update-interval">
      <label htmlFor="dropdown-trigger">Update interval: </label>
      <div className="dropdown-container">
        <button onClick={dropdownChangeState} className="dropdown-trigger">
          <span ref={selectedValue} className="value">
            {ticker.updateInterval / 1000} sec
          </span>
        </button>
        <ul ref={dropdown} className="dropdown">
          {timeValues.map((value, index) => (
            <li key={index} onClick={() => dropdownItemClick(value)}>
              <span>{value / 1000} sec</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

UpdateInterval.propTypes = {
    ticker: PropTypes.object.isRequired,
};
