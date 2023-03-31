react:
useState() - хранение и изменение стейта
useEffect(() => {}) - действие при первой отрисовки компонента
useRef() - хранение ссылок (на элемент)
useCallback() - убирает доп вызов ф-ии

{ BrowserRouter } => { Routes, Route } <Route path="/" element={<Home />} /> => { Link } => <Link to="/"> - для перехода по страниццам - ссылкам, все компоненты нужно обернуть в Routes

{ createContext } => помещаем в переменную AppContext => <AppContext.Provider value={{}}> => { useContex } => useContext(AppContext) - пропсы достаются во всех обернутых в AppContext.Provider компонентах


redux:
{ Provider } => создаем папку redux в ней store.js и второй Slice.js.
оборочиваем все приложение в <Provider store={store}>
в store.js : 
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slice/filterSlice'; импортируем второй созданый  файл

export const store = configureStore({
   reducer: {
      filterSlice, имя переменной в кот. помещаем createSlice ф-ию во втором файле
   },
});
 в Slice.js:
   import { createSlice } from "@reduxjs/toolkit";

   const initialState = {
      categoryType: 0,
      sortType: {
         name: 'популярности',
         sort: 'rating',
      }
   }

   export const filterSlice = createSlice({
      name: "filter",
      initialState,
      reducers: { это наши action'ы
         setCategoryType(state, action) {
            state.categoryType = action.payload;
         },
         setSortType(state, action) {
            state.sortType = action.payload;
         },
      },
   });

   export const {setCategoryType, setSortType} = filterSlice.actions

   export default filterSlice.reducer

импортируем => 
import { useSelector, useDispatch } from 'react-redux';

useSelector - типо тейта => помещаем в переменную const 'название переменной' = useSelector((state) => state.filterSlice.categoryType - название стейта из initialState)

useDispatch - типо сетстейта => помещаем в переменную хук const dispatch = useDispatch()

и action который нам нужен =>
import { setCategoryType } from '../redux/slice/filterSlice';


lodesh: (библиотека с кучей методов)
Выполнение запроса через определенное время чтоб не отправлять постоянные запросы во время набора текста в поисковой строке (Debounce - отложеная ф-ия)

npm install lodash.debounce =>
import debounce from 'lodash.debounce';


npm install qs
библиотека qs благодаря ей можно парсить параметры или сгенерировать, чтоб при перезагрузке страници, оставаться на той же вкладке

библиотека clsx - несколько строчек соединяет в одну, для кнопки в корзине чтоб она дизейблилась когда у нас остается один товар

lazy - ленивая подгрузка

<Suspense fallback={<div>Идет загрузка ...</div>}> - что показывать пока грузится