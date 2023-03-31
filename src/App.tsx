import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'; //ленивая загрузка

// import NotFound from './pagers/NotFound';
// import Cart from './pagers/Cart';
// import FullPizza from './pagers/FullPizza';
import Home from './pagers/Home';
import MainLayout from './components/layouts/MainLayout';

import './scss/app.scss';

const Cart = lazy(() => import('./pagers/Cart'));
const FullPizza = lazy(() => import('./pagers/FullPizza'));
const NotFound = lazy(() => import('./pagers/NotFound'));

function App() {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={
                  <Suspense fallback={<div>Идет загрузка ...</div>}>
                     <Cart />
                  </Suspense>
               }/>
            <Route path="pizza/:id" element={
                  <Suspense fallback={<div>Идет загрузка ...</div>}>
                     <FullPizza />
                  </Suspense>
               }/>
            <Route  path="*" element={
                  <Suspense fallback={<div>Идет загрузка ...</div>}>
                     <NotFound />
                  </Suspense>
               }/>
         </Route>
      </Routes>
   );
}

export default App;
