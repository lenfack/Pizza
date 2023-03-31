import {memo} from 'react';


type CategoriesProps = {
   categoryType: number;
   onClickCategory: (i: number) => void;
};


const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


const Categories: React.FC<CategoriesProps> = memo(({categoryType, onClickCategory}) => {
   return (
      <div className="categories">
         <ul>
            {categories.map((text, index) => (
               <li key={text} onClick={() => onClickCategory(index)} className={categoryType === index ? 'active' : ''}>{text}
               </li>
            ))}
         </ul>
      </div>
   );
});

export default Categories;
