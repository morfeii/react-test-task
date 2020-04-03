import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';


export const StockChart = ({ prices }) => {
    const style = { backgroundColor: 'rgba(65, 74, 176, 0.6)' };
    const data = {
        labels: Array(prices.length).fill(''),
        datasets: [{ data: [...prices], ...style }]
    };
    const options = {
        maintainAspectRatio: false,
        legend: { display: false }
    };

    return (
      <div className="chart-container">
        <Bar id="chart" data={data} options={options} />
      </div>
    );
};

StockChart.propTypes = {
    prices: PropTypes.arrayOf(PropTypes.string).isRequired,
};
