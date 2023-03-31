import { CartItem } from "../redux/slice/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
   return items.reduce((sum, obj) => obj.price * obj.count + sum, 0) // складываем сумму заказов в корзине
}
