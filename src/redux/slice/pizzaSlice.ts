import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

//если все параметры строчки или числа можно написать так Record<string(ключь), string(значения)> и все его kлючи будут строчки и все значеиня строчки Record<string(ключь), number(значения)> все значения числа
type FetchPizzasArgs = Record<string, string>

type Pizza = {
   id: string;
   title: string;
   price: number;
   imageUrl: string;
   sizes: number[];
   types: number[];
}

export enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error',
}

interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

//создаем асинхронный экшен, делаем запрос на бэк
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: FetchPizzasArgs) => {
   const { category, toggleSortAz, search, currentPage, sortType } = params;
   const { data } = await axios.get<Pizza[]>(
      `https://63c96798904f040a965d7b02.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortby=${sortType}&order=${toggleSortAz}&${search}`,
   );
   return data; //дата это массив пицц
});

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING, // loading | success | error
};

export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state, action) => {
         state.status = Status.LOADING;
         state.items = [];
      });

      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = Status.SUCCESS;
      });

      builder.addCase(fetchPizzas.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.items = [];
      });
   }

   // extraReducers: {
   //    [fetchPizzas.pending]: (state) => {
   //       state.status = 'loading';
   //       state.items = [];
   //    },
   //    [fetchPizzas.fulfilled]: (state, action) => {
   //       state.items = action.payload;
   //       state.status = 'success';
   //    },
   //    [fetchPizzas.rejected]: (state) => {
   //       state.status = 'error';
   //       state.items = [];
   //    },
   // },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
