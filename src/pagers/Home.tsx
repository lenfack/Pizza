//import React
import { useState, useEffect, useCallback } from 'react';

//import Redux
import { useAppSelector, useAppDispatch } from '../redux/store';
import { setCategoryType, setCurrentPage } from '../redux/slice/filterSlice';
import { fetchPizzas } from '../redux/slice/pizzaSlice';

//import компонентов
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizza-block/Pizza-block';
import Skeleton from '../components/Pizza-block/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../Pagination/Pagination';

const Home: React.FC = () => {
   //Redux
   const dispatch = useAppDispatch(); //присваиваем хук useDispatch(), переменной dispatch
   const categoryType = useAppSelector((state) => state.filterSlice.categoryType); //присваиваем переменной categoryType хук useSelector() который берет значение из initialState в файле filterSlice
   const sortType = useAppSelector((state) => state.filterSlice.sortType.sort);
   const currentPage = useAppSelector((state) => state.filterSlice.currentPage);
   const searchValue = useAppSelector((state) => state.filterSlice.searchValue);
   const { items, status } = useAppSelector((state) => state.pizzaSlice);

   //React
   // const { searchValue } = useContext(AppContext);
   const [sortToggleAz, setSortToggleAz] = useState<boolean>(true);

   const onClickCategory = useCallback((id: number) => {
      dispatch(setCategoryType(id));
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
   };

   const getPizzas = async () => {
      //условия поиска для mockAPI
      const category = categoryType > 0 ? `category=${categoryType}` : '';
      const toggleSortAz = sortToggleAz ? 'asc' : 'desc';
      const search = searchValue ? `search=${searchValue}` : '';

      dispatch(
         fetchPizzas({
            category,
            toggleSortAz,
            search,
            sortType,
            currentPage: String(currentPage),
         }),
      );

      window.scrollTo(0, 0); //сбрасывает скролл на сайте при перезагрузке
   };

   useEffect(() => {
      getPizzas();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [categoryType, sortType, sortToggleAz, searchValue, currentPage]);
   //следим за изменениями категорий, сорта, возрастания, строки поиска и номер страницы

   //сокращение для условия className="content__items"
   const pizzas = items.map((obj: any) => (
         <PizzaBlock key={obj.id} {...obj} />
   ));
   const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="container">
         <div className="content__top">
            <Categories categoryType={categoryType} onClickCategory={onClickCategory} />
            <Sort sortToggleAz={sortToggleAz} setSortToggleAz={setSortToggleAz} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' ? (
            <div className="content__error-info">
               <h2>Уууууупс!</h2>
               <p>Произошла ошибка, попробуйте позже!</p>
            </div>
         ) : (
            <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
         )}
         <Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
      </div>
   );
};

export default Home;
