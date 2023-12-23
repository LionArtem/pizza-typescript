import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';
import NodFaund from './pages/NodFaund';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MainLayot from './components/layouts/MainLayot';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayot />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NodFaund />} />
      </Route>
    </Routes>
  );
}

export default App;
