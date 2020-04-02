import React from 'react';
import moment from 'moment';

export const StockQuotesData = ({ initialPrice, ticker }) => {
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
    <div className="stock-panel">
      <div className="exchange-info">
        <span className="stock-symbol">{ticker.stockSymbol}</span>
        <span className="exchange">{ticker.exchange}</span>
      </div>
      <div className="trade-info">
        <div className="price-changes">
          <span className="current-price">{ticker.price}</span>
          <span
            className="change-units"
            data-change={priceUnitChanged >= 0 ? 'increased' : 'decreased'}>
            {priceUnitChanged}
          </span>
          <span
            className="change-percent"
            data-change={pricePercentChanged >= 0 ? 'increased' : 'decreased'}>
            {pricePercentChanged}%
          </span>
        </div>
        <div className="last-trade">
          <span className="time">last trade: {lastTrade}</span>
        </div>
      </div>
    </div>
  );
};
