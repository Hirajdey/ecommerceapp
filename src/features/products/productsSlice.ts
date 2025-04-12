import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from './productTypes';

interface ProductsState {
	items: Product[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductsState = {
	items: [],
	loading: false,
	error: null
}

export const getProducts = createAsyncThunk(
	'products/fetchProducts',
	async (_, thunkAPI) => {
		try {
			const res = await fetch('https://fakestoreapi.com/products');
			if(!res.ok){ 
				throw new Error(`HTTP Error! Status: ${res.status}`);
			}
			return (await res.json()) as Product[];
		} catch (error:any) {
			return thunkAPI.rejectWithValue(error.message || "Failed to fetch products")
		}		
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getProducts.pending, state => {
			state.loading = true;
			state.error = null;
		}).addCase(getProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.items = action.payload;
		}).addCase(getProducts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Something went wrong'
		});
	},
});

export default productsSlice.reducer;
export type { ProductsState };