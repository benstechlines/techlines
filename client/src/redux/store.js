import { combineReducers, configureStore } from '@reduxjs/toolkit';

import product from './slices/product';
import cart from './slices/cart';

const reducer = combineReducers({
	product,
	cart,
});

export default configureStore({ reducer });
