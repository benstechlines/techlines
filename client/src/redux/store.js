import { combineReducers, configureStore } from '@reduxjs/toolkit';

import product from './slices/product';
import cart from './slices/cart';
import user from './slices/user';
import order from './slices/order';

const reducer = combineReducers({
	product,
	cart,
	user,
	order,
});

export default configureStore({ reducer });
