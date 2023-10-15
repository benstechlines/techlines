import { combineReducers, configureStore } from '@reduxjs/toolkit';

import product from './slices/product';
import cart from './slices/cart';
import user from './slices/user';

const reducer = combineReducers({
	product,
	cart,
	user,
});

export default configureStore({ reducer });
