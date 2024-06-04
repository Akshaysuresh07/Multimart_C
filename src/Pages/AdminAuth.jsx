import React, { useState } from 'react';
import {FloatingLabel,Form }from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminLoginApi } from '../Services/allApi';

function AdminAuth({insideReg}) {
    const navigate = useNavigate()

const [adminInput,setAdminInput]=useState( {name: '', email: '', password: ''})
const handleAdminRegister=()=>{
//admin register..
    
}
const handleAdminLogin=async()=>{
    if(adminInput.email==''||adminInput.password==''){
        toast.warning('fill it all fields')
      }
      else{
     try{
       const   result=await adminLoginApi(adminInput)
      console.log(result);
      if(result.status==200){
        sessionStorage.setItem('user',JSON.stringify(result.data.user))
        sessionStorage.setItem('token',JSON.stringify(result.data.token))
        toast.success(`welcome ${result.data.user.name}...`)
        setAdminInput({  email: "", password: "" })
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      } else {
        toast.error('incorrect password or email')
      }
      }catch(err){
        console.log(err);
      }
  
      }
  

}

  return (
    <>
    <div style={{height:'100vh',background:'grey'}} className=' container-fluid d-flex justify-content-center align-items-center pt-3'>
    <div style={{width:'50%'}} className='mt-5   p-5 card  shadow  '> 
    <h2 className='fw-bolder mt-2  text-center fw-bold'>Admin Sign {insideReg ? 'up' : 'in'} </h2>

      
            {
                insideReg &&
                <FloatingLabel
                  controlId="floatingInputName"
                  label="name"
                  className="mb-3"
                >
                  <Form.Control value={adminInput.name} onChange={(e) => setAdminInput({ ...adminInput, name: e.target.value })} type="text" placeholder="Username" />
                </FloatingLabel>
              }
            <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control value={adminInput.email} onChange={(e) => setAdminInput({ ...adminInput, email: e.target.value })}  type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control value={adminInput.password} onChange={(e) => setAdminInput({ ...adminInput, password: e.target.value })} type="password" placeholder="Password" />
          </FloatingLabel>
          {
            insideReg ?
              <div className='mt-3'>
                <button onClick={handleAdminRegister}  className='btn btn-primary'>Register</button>
                <p>Already have an account? Click here to <Link className='text-info' style={{ textDecoration: 'none' }} to={'/adminRegister'}>Login</Link></p>
              </div> :
              <div className='mt-3'>
                <button onClick={handleAdminLogin}  className='btn btn-primary'>Login</button>
              </div>
          }
      </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  );
}

export default AdminAuth;