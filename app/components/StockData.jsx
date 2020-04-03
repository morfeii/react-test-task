import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';


export const StockData = ({ initialPrice, ticker }) => {
    const priceFound = initialPrice && ticker.price;

    let priceUnitChanged = 0;
    let pricePercentChanged = 0;
    let lastTrade = moment
    .utc()
    .startOf('day')
    .fromNow();

    if (priceFound) {
        priceUnitChanged = (ticker.price - initialPrice).toFixed(2);
        pricePercentChanged = (
      ((ticker.price - initialPrice) / initialPrice) *
      100
    ).toFixed(2);

        lastTrade = moment
      .utc(ticker.last_trade_time)
      .startOf('day')
      .fromNow();
    }

    return (
    <div className="stock-data">
      <div className="stock-data__info">
        <span className="stock-data__symbol">{ticker.stockSymbol}</span>
        <span className="stock-data__exchange">{ticker.exchange}</span>
      </div>
      <div className="stock-data__trade">
        <div className="stock-data__price">
          <span className="stock-data__current-price">{ticker.price}</span>
          <span
            className="stock-data__units"
            data-change={priceUnitChanged >= 0 ? 'increased' : 'decreased'}>
            {priceUnitChanged}
          </span>
          <span
            className="stock-data__percent"
            data-change={pricePercentChanged >= 0 ? 'increased' : 'decreased'}>
            {pricePercentChanged}%
          </span>
        </div>
        <div className="stock-data__last-trade">
          <span className="stock-data__time">last trade: {lastTrade}</span>
        </div>
      </div>
    </div>
  );
};

StockData.propTypes = {
    initialPrice: PropTypes.string.isRequired,
    ticker: PropTypes.object.isRequired,
};
