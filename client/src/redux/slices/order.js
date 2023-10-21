import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: true,
	orderInfo: null,
	orderId: null,
	shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) ?? null,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		setShippingAddress: (state, { payload }) => {
			state.shippingAddress = payload;
			state.loading = false;
			localStorage.setItem('shippingAddress', JSON.stringify(payload));
		},
		clearOrder: (state) => {
			state = initialState;
		},
	},
});

export const { setLoading, setError, setShippingAddress, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
export const orderSelector = (state) => state.order;
