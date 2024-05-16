
import { Route,Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/indexPage'
import LoginPage from './pages/loginPage'
import Layout from './components/layout'
import RegisterPage from './pages/registerPage'
import axios from 'axios'

import { UsercontextProvide } from './usercontext'
import AccountPage from './pages/acountPage'
import ProductsPage from './pages/productsPage'
import Mycars from './pages/mycarsPage'
import Carsformpage from './pages/carsformPage'



axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true ; // for the cookies

function App() {
  
  
  return (
    <UsercontextProvide>
     <Routes>
      <Route path='/'element={<Layout/>} >
        <Route  index element={ <IndexPage />} />
        <Route path='/products' element = {<ProductsPage/>}  />
        <Route path='/login' element = {<LoginPage/>}  />
        <Route path='/register' element = {<RegisterPage/>}  />
        <Route path='/account' element = {<AccountPage/>} />
        <Route path='/account/cars' element = {<Mycars/>} />
        <Route path='/account/cars/new' element = {<Carsformpage/>} />
        <Route path='/account/cars/:id' element = {<Carsformpage/>} />
        
      </Route>
     </Routes>
    </UsercontextProvide>

  )
}

export default App
