import React, { useContext, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import loginUSer from '../assets/login-user.png'
import { loginApi, registerApi } from '../Services/allApi';
import { AuthContext } from '../context/Authcontext';



function Auth({insideRegister}) {
  const{isAuthorised, setIsAuthorised}=useContext(AuthContext)
  const navigate = useNavigate()


  const [userInputs, setUserInputs] = useState({
    name: '', email: '', password: ''
  })
  console.log(userInputs);

  const handleRegister=async(e)=>{
    e.preventDefault()
    
    if(userInputs.name==='' || userInputs.email==='' || userInputs.password===''){
      toast.error('Please fill all the fields')
      if(userInputs.email.includes('@')===false){
        toast.error('Invalid email')
      }
    }
    else{
      console.log(userInputs);
     try{ 
      const result=await registerApi(userInputs)
      console.log(result);
      if(result.status==201){
        toast.success('Registered Successfully')
        setUserInputs({ name: "", email: "", password: "" })
        setTimeout(()=>{
          navigate('/login')
        
        },2000)
      }
      else{
        toast.error(result.response.data)
        setTimeout(() => {
          setUserInputs({ username: "", email: "", password: "" })

        }, 2000)
      }
      }
    
    catch(err){
      console.log(err);
    }
     
    
    }

  }
  const handleLogin=async(e)=>{
    e.preventDefault()
    if(userInputs.email==''||userInputs.password==''){
      toast.warning('fill it all fields')
    }
    else{
   try{
     const   result=await loginApi(userInputs)
    console.log(result);
    if(result.status==200){
      sessionStorage.setItem('existingUser',JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)
      setIsAuthorised(true)
      toast.success(`welcome ${result.data.existingUser.name}...`)
      setUserInputs({  email: "", password: "" })
      setTimeout(() => {
        navigate('/')
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
      <div style={{ width: '100%', minHeight: '100%' }} className="d-flex justify-content-center align-items-center pt-3">
        <div className="container w-75">
          <Link to={'/'} style={{ textDecoration: 'none' }}> <i className="fa-solid fa-arrow-left "></i>Back to Home</Link>
          <div className="card shadow p-5">
            <div className="row align-items-center">
              <div className="col-lg-6">
              <LazyLoadImage className='img-fluid' src={loginUSer} alt="login" />
              </div>
              <div className="col-lg-6">
                <h2 className='fw-bolder mt-2 py-1'>Multi<span className='text-warning'>mart</span></h2>
                <p className='fw-bolder mt-2 '>Sign {insideRegister ? 'up' : 'in'} to your account</p>
                <Form >

                  {
                    insideRegister &&
                    <FloatingLabel
                      controlId="floatingInputName"
                      label="name"
                      className="mb-3"
                    >
                      <Form.Control value={userInputs.name} onChange={(e) => setUserInputs({ ...userInputs, name: e.target.value })} type="text" placeholder="Username" />
                    </FloatingLabel>
                  }

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control value={userInputs.email} onChange={(e) => setUserInputs({ ...userInputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control value={userInputs.password} onChange={(e) => setUserInputs({ ...userInputs, password: e.target.value })} type="password" placeholder="Password" />
                  </FloatingLabel>

                  {
                    insideRegister ?
                      <div className='mt-3'>
                        <button onClick={handleRegister}  className='btn btn-primary'>Register</button>
                        <p>Already have an account? Click here to <Link className='text-info' style={{ textDecoration: 'none' }} to={'/login'}>Login</Link></p>
                      </div> :
                      <div className='mt-3'>
                        <button onClick={handleLogin}  className='btn btn-primary'>Login</button>
                        <p>New user? Click here to <Link className='text-info' style={{ textDecoration: 'none' }} to={'/register'}>Register</Link></p>
                      </div>
                  }

                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Auth