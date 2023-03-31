import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type SortR = {
   name: string;
   sort: 'rating' | 'title' | 'price';
};

interface FilterSliceState {
   searchValue: string;
   categoryType: number;
   currentPage: number;
   sortType: SortR;
}

const initialState: FilterSliceState = {
   searchValue: '',
   categoryType: 0,
   currentPage: 1,
   sortType: {
      name: 'популярности',
      sort: 'rating',
   },
};

export const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },
      setCategoryType(state, action: PayloadAction<number>) {
         state.categoryType = action.payload;
      },
      setSortType(state, action: PayloadAction<SortR>) {
         state.sortType = action.payload;
      },
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload;
      },
   },
});

export const { setCategoryType, setSortType, setCurrentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
