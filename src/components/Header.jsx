import React, { useContext, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'

function Header() {
  const navigate=useNavigate()
  const{isAuthorised, setIsAuthorised}=useContext(AuthContext)
  const [searchbar,setSearchbar]=useState(false)
  const handleSearchClick = () => {
    setSearchbar(true)
    navigate('/shop', { from: 'header' })
};
const handleLogoutClick = () => {

  sessionStorage.clear()
  setIsAuthorised(false)
  navigate('/')
};
const handleSignIn=()=>{
  navigate('/login')
}
const handleCart=()=>{
  if(isAuthorised){
    navigate('/cart')
  }
  else{
    navigate('/login')
  
  }
}
  return (
    <>
    <Navbar className='p-3' style={{background:'#0f3460'}} data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home" className='fs-3 fw-bolder'><span className='text-warning' >Multi</span>mart</Navbar.Brand>
     {!searchbar?
       <Nav className="ms-5">
        <Nav.Link className='text-light' ><Link to={'/'} style={{textDecoration:'none',color:'white'}}>Home</Link></Nav.Link>
        <Nav.Link href="#features">Category</Nav.Link>
        <Nav.Link href="#pricing">About us</Nav.Link>
      </Nav>
    
      :  <div className='ms-5 '  >
      <input  style={{width:'450px',height:'40px',marginLeft:'80px'}} className='form-control bg-light text-dark ' type='text' placeholder='Search' />
      </div>
     }
   
  <Nav className='ms-auto'>
  <Nav.Link onClick={handleSearchClick}  style={{width:'40px',height:'40px'}} ><i class="fa-solid fa-magnifying-glass"></i></Nav.Link>
            
     <Nav.Link style={{width:'40px',height:'40px'}} >  <i  class="fa-solid fa-heart"></i></Nav.Link>
   <Nav.Link style={{width:'40px',height:'30px'}} >   <i onClick={handleCart} class="fa-solid fa-cart-shopping"></i></Nav.Link>
   {isAuthorised?
    
    <Nav .Link style={{width:'150px',height:'40px'}} ><button onClick={handleLogoutClick} style={{background:'black'}} className='btn  '> Sign Out</button></Nav .Link>
    
    :<Nav.Link style={{width:'100px',height:'40px'}} > <button onClick={handleSignIn} style={{background:'black'}} className='btn '> Sign In</button></Nav.Link>}
         
  </Nav>

  
    </Container>
  </Navbar>
    
    </>  )
}

export default Header