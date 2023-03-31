import { calcTotalPrice } from './calcTotalPrice';

export const getCratFromLS = () => {
   const items = JSON.parse(localStorage.getItem('cart')) || [];
   const totalPrice = calcTotalPrice(items);

   return {
      items,
      totalPrice,
   };
};
