import '../styles/main.scss';
import { connect as tickerConnect } from '../services';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { StockChart } from './StockChart.jsx';
import { updateStockTicker } from '../reducers/actionCreators';
import { StockData } from './StockData.jsx';
import UpdateInterval from './UpdateInterval.jsx';

const PRICES_LEN = 10;

class App extends PureComponent {
    constructor() {
        super();
        this.prices = [];
    }

    componentDidMount() {
        tickerConnect('AAPL', this.props.updateStockTicker);
    }

    managePrices() {
        const { price } = this.props.ticker;
        if (!price) return;

        this.prices.push(price);

        if (this.prices.length > PRICES_LEN) {
            this.prices.splice(0, this.prices.length - PRICES_LEN);
        }
    }

    render() {
        this.managePrices();
        const { ticker } = this.props;

        return (
      <div className="stock-ticker">
        <StockData ticker={ticker} initialPrice={this.prices[0]} />
        <StockChart prices={this.prices} />
        <UpdateInterval ticker={ticker} />
      </div>
    );
    }
}

const mapStateToProps = state => ({ ticker: state });
const mapDispatchToProps = {
    updateStockTicker,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
