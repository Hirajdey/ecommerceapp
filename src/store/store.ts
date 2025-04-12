import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		products: productsReducer
		// Add more slices here
	}
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


/*export type RootState = ReturnType<typeof store.getState>;
✅ What's happening here?
store.getState() is a function that returns the entire Redux state object.

typeof store.getState gives you the type of that function.

ReturnType<typeof store.getState> extracts the return type of that function, which is your complete state shape.

So, RootState becomes the type that represents your Redux state tree.

If your store looks like this :

reducer: {
  counter: counterReducer,
  products: productsReducer
}

Then RootState types will look like this :

type RootState = {
  counter: CounterState;
  products: ProductsState;
}

and then we can use ti like this : 

const count = useSelector((state: RootState) => state.counter.value)

This helps you get autocomplete, type checking, and avoids bugs!*/

