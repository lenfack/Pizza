import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';


interface PaginationProps {
   currentPage: number;
   setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, setCurrentPage}) => {
   return (
      <div>
         <ReactPaginate className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={4} //сколько будет отображаться на странице товаров
            pageCount={3} //колличество страниц
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
         />
      </div>
   );
};

export default Pagination;
