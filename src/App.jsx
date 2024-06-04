import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import AllProducts from './Pages/AllProducts'
import Auth from './Pages/Auth'
import AdminAuth from './Pages/AdminAuth'
import Dashboard from './Pages/Admin/Dashboard'
import ProductView from './Pages/productView/ProductView'
import Cart from './Pages/Cart'
import Cancel from './Pages/Cancel'
import Success from './Pages/Success'

function App() {

  return (
    <>
      
   <Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/login' element={<Auth/>} />
   <Route path='/register' element={<Auth insideRegister/>} />
   <Route path='/shop' element={<AllProducts/>}/>
   <Route path='/Product/:pid' element={<ProductView/>}/>
   <Route path='/cart' element={<Cart/>}/>
   <Route path='/success' element={<Success/>}/>
   <Route path='/cancel' element={<Cancel/>}/>
   <Route path='*' element={<Navigate to ={'/'}/>}/>
   
   <Route path='/adminLogin' element={<AdminAuth/>}/>
   <Route path='/adminRegister' element={<AdminAuth insideReg/>}/>
   <Route path='/dashboard'element={<Dashboard/>}/>

   
   </Routes>
     
    </>
  )
}

export default App
