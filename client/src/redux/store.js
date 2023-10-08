import { combineReducers, configureStore } from '@reduxjs/toolkit';

import product from './slices/product';

const reducer = combineReducers({
	product,
});

export default configureStore({ reducer });
