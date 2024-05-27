
import { Route,Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/indexPage'
import LoginPage from './pages/loginPage'
import Layout from './components/layout'
import RegisterPage from './pages/registerPage'
import axios from 'axios'
import { Analytics } from "@vercel/analytics/react";

import { UsercontextProvide } from './usercontext'
import AccountPage from './pages/acountPage'
import ProductsPage from './pages/productsPage'
import Mycars from './pages/mycarsPage'
import Carsformpage from './pages/carsformPage'
import SingleCarPage from './pages/singleCarPage'
import AboutUs from './pages/aboutus'
import AdminLayout from './pages/adminPages/adminLayout'
import AdminLoginPage from './pages/adminPages/adminLoginPage'
import { AdmincontextProvide } from './admincontext'
import AdminRegisterPage from './pages/adminPages/adminRegisterPage'
import AdminAdminsPage from './pages/adminPages/adminHalfPages/AdminAdminsPage'
import AdminCarsPage from './pages/adminPages/adminHalfPages/AdminCarsPage'
import AdminDashboardPage from './pages/adminPages/adminHalfPages/AdminDashboardPage'
import AdminUsersPage from './pages/adminPages/adminHalfPages/AdminUsersPage'
import AdminProfilePage from './pages/adminPages/adminHalfPages/AdminProfilePage'



axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true ; // for the cookies

function App() {
  
  
  return (
    
      <AdmincontextProvide>
        <UsercontextProvide>
           <Analytics/>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/cars" element={<Mycars />} />
              <Route path="/account/cars/new" element={<Carsformpage />} />
              <Route path="/account/cars/:id" element={<Carsformpage />} />
              <Route path="/car/:id" element={<SingleCarPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Route>

            <Route path="/adminlogin" element={<AdminLoginPage />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminUsersPage />} />
              <Route path="/admin/admins" element={<AdminAdminsPage />} />
              <Route path="/admin/cars" element={<AdminCarsPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/profile" element={<AdminProfilePage />} />
            </Route>
          </Routes>
        </UsercontextProvide>
      </AdmincontextProvide>
    
  );
}

export default App
