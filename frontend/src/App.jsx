import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from'./components/Navbar'
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/register/" element = {<Register/>}/>
        <Route path = "/login/" element = {<Login/>}/>
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App;
