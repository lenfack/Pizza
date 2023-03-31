import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slice/filterSlice';
import cartSlice from './slice/cartSlice';
import pizzaSlice from './slice/pizzaSlice';

import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
   reducer: {
      filterSlice,
      cartSlice,
      pizzaSlice,
   },
});


//типизация стора, селекторa и диспатча
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;