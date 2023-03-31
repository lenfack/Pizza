import { useState, useCallback } from 'react';
// import { AppContext } from '../../App';
import { useAppDispatch } from '../../redux/store';
import { setSearchValue } from '../../redux/slice/filterSlice';

import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

const Search: React.FC = () => {
   const dispatch = useAppDispatch()
   const [value, setValue] = useState<string>('');
   // const { setSearchValue } = useContext(AppContext);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const updateSearchValue = useCallback(
      debounce((str: string) => {
         dispatch(setSearchValue(str));
      }, 500),
      [],
   );

   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      updateSearchValue(event.target.value);
   };

   return (
      <div className={styles.root}>
         <img className={styles.icon} src="/img/search.png" alt="search" />
         <input
            value={value}
            onChange={onChangeInput}
            className={styles.input}
            placeholder="Поиск пиццы ..."
         />
      </div>
   );
};

export default Search;
