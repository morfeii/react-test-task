import { UPDATE_STOCK_TICKER } from './types';

export const updateStockTicker = (data) => ({
    type: UPDATE_STOCK_TICKER,
    payload: data,
});
