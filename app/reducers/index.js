import { UPDATE_STOCK_TICKER } from './types';

export const stockTicker = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_STOCK_TICKER:
            return action.payload;

        default:
            return state;
    }
};
