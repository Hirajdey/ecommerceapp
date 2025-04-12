import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



/*You're importing tools from react-redux:

useDispatch — to dispatch actions.

useSelector — to read values from the Redux state.

TypedUseSelectorHook — a type that helps make useSelector type-safe.

You're also importing your custom types:

RootState: the type for the entire Redux state (from your store).

AppDispatch: the type for the Redux dispatch function.*/

