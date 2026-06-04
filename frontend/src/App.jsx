import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login';

function App() {
  

  return (
    <Routes>
      <Route path = "/Register/" element = {<Register/>}/>
      <Route path = "/Login/" element = {<Login/>}/>
    </Routes>
  )
}

export default App;
