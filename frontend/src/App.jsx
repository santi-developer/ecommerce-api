import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from'./components/Navbar'
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
<<<<<<< HEAD
import Checkout from './pages/Checkout';
import PrivateRoute from './components/PrivateRoute';
import Orders from './pages/Orders';
=======
import PrivateRoute from './components/PrivateRoute'
>>>>>>> fae906edc395e03f08c53e563e14721ac3f7a22f

function App() {
  

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path="/products/:slug" element={<ProductDetail />} />
<<<<<<< HEAD
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
=======
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
>>>>>>> fae906edc395e03f08c53e563e14721ac3f7a22f
      </Routes>
    </>
  )
}

export default App;
