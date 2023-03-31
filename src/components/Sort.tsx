
import { memo, useEffect, useRef, useState } from 'react';
//Redux

import { setSortType } from '../redux/slice/filterSlice';
import { useAppSelector, useAppDispatch} from '../redux/store'; 

interface SortPopup {
   name: string;
   sort: any;
};

const menuPopup: SortPopup[] = [ 
   {name: 'популярности', sort: 'rating'}, 
   {name: 'цене', sort: 'price'}, 
   {name: 'алфавиту', sort: 'title'}
];

type SortPopupProps = {
   sortToggleAz: boolean;
   setSortToggleAz: any;
}





const Sort: React.FC<SortPopupProps> = memo(({sortToggleAz, setSortToggleAz}) => {
   const dispatch = useAppDispatch();
   const sortType = useAppSelector(state => state.filterSlice.sortType);
   const sortRef = useRef<HTMLDivElement>(null);
   const [openPopup, setOpenPopup] = useState<boolean>(false);
   

   const clickActiveTextMenu = (obj: SortPopup) => {
      dispatch(setSortType(obj))
      setOpenPopup(false);
   };

   // открытие и закрытие сортировки при нажатии на любую точку экрана
   useEffect(() => {
      const clickOutside = (event: Event) => {
         let path = (event as MouseEvent).composedPath() as Array<EventTarget>;// получаем массив элементов пути. console.log(path)
         if (!path.includes(sortRef.current)){
            setOpenPopup(false);
         }
      }
      document.body.addEventListener('click', clickOutside);

      return () => document.body.removeEventListener('click', clickOutside) // Удаляем при размантировании компонента, чтоб не задваивались запросы
   }, []);

   return (
      <div ref={sortRef} className="sort">
         <div className="sort__label">
            <div style={{ cursor: 'pointer', marginRight: '7px', marginTop: '5px'}} onClick={() => setSortToggleAz(!sortToggleAz)} >
               <img style={{ height: '15px', width: '15px' }} src={sortToggleAz ? '/img/sortUp.png' : '/img/sortDown.png'} alt="sortToggle"/>
            </div>
            <div
               onClick={() => setOpenPopup(!openPopup)}
               style={{ height: '26px', cursor: 'pointer' }} >
               <svg
                     width="10"
                     height="6"
                     viewBox="0 0 10 5"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     style={!openPopup ? { transform: 'scaleY(1)'} : { transform: 'scaleY(-1)'}} >
                     <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C" />
                  </svg>
            </div>
            <b>Сортировка по:</b>
            <div style={{width: '105px'}}>
               <span onClick={() => setOpenPopup(!openPopup)}>{sortType.name}</span>
            </div>
         </div>
         {openPopup && (
            <div className="sort__popup">
               <ul>
                  {menuPopup.map((obj, index) => (
                     <li
                        key={index}
                        onClick={() => clickActiveTextMenu(obj)}
                        className={sortType.sort === obj.sort ? 'active' : ''}>
                        {obj.name}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
});

export default Sort;
