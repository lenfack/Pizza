import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCratFromLS } from '../../utils/getCartFromLS';


export type CartItem = {
   id: string;
   title: string;
   type: string;
   size: number;
   price: number;
   imageUrl: string;
   count: number;
}

interface CartSliceState {
   totalPrice: number;
   items: CartItem[];
}

const {items, totalPrice} = getCratFromLS()

const initialState: CartSliceState = {
   totalPrice,
   items,
};

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<CartItem>) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);
         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }

         state.totalPrice = calcTotalPrice(state.items) // складываем сумму заказов в корзине
      },

      minusItem(state, action: PayloadAction<string>) {
         console.log(action.payload)
         const findItem = state.items.find((obj) => obj.id === action.payload);
         if(findItem){
            findItem.count--;
         }
      },

      removeItem(state, action: PayloadAction<string>) {
         state.items = state.items.filter((obj) => obj.id !== action.payload);
      },

      clearItems(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   },
});

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
