import React, { useEffect, useState } from 'react';
import { Container, Table, Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap';
import Footer from '../components/footer/Footer';
import Header from '../components/Header';
import {useDispatch, useSelector }from 'react-redux';
import { apiUrl } from '../Services/apiUrl';
import { getCartApi, removeItemFromCartApi } from '../Services/allApi';
import { loadStripe } from '@stripe/stripe-js';
import cartlogo from '../assets/cartlogo.webp'
import { Link } from 'react-router-dom';

const Cart = () => {
const dispatch=useDispatch()
const [cartItems,setCartItems]=useState([])
  const cartItem=useSelector(state=>state.cartReducer)
  console.log(cartItem);
  const getCart=async()=>{
    const token=sessionStorage.getItem('token')
    const reqHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const res=await getCartApi(reqHeaders)
    console.log(res);
    if(res.status==200){
      console.log(res.data);
      setCartItems(res.data)
 
    }
    }
    console.log(cartItems);
   
  //   const handleCheckout = async () => {
  //     try {
  //       const reqHeaders = {
  //         "Content-Type": "application/json",
          
  //       };
  //         const stripe = await loadStripe('pk_test_51PBsXNSI5N2syWU1bHGkrvowOAPkBYJMiGUyY84ZsVjhzriTUwzKNRTbAl97yGDb6qgIB7DdFHwvc1GUzKadfShw00SsEPvWZN');
         
  //         const response = await paymentCheckout(reqHeaders,cartItems.items)
  //         console.log(response);
  //         const result = await stripe.redirectToCheckout({
  //             sessionId: response?.data?.id
  //         });
  //     } catch (err) {
  //         console.error(err);
  //         // Handle error, e.g. show an error message to the user
  //     }
  // };
  const handleCheckout = async()=>{
    const stripe = await loadStripe("pk_test_51PBsXNSI5N2syWU1bHGkrvowOAPkBYJMiGUyY84ZsVjhzriTUwzKNRTbAl97yGDb6qgIB7DdFHwvc1GUzKadfShw00SsEPvWZN");

    const body = {
        items:cartItems.items
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:3000/checkout",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });
    console.log(response);

    const session = await response.json();
    console.log(session);

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    console.log(result);
    
    if(result.error){
        console.log(result.error);
    }
}
  const items=cartItems.items
  console.log(items);
  let totalAmount=cartItems.items && cartItems.items.reduce((total, item) => total + item.price , 0)
  const removeItem=async(id)=>{
    const token=sessionStorage.getItem('token')

    const reqHeaders = {
      
      "Authorization": `bearer ${token}`
    };

    console.log(reqHeaders);
    const res= await removeItemFromCartApi(id,reqHeaders);
    console.log(res);
    if(res.status==200){
      console.log(res.data);
      setCartItems(res.data)
 
    }
  }
  
useEffect(() => {
getCart()
},[cartItem])

  return (
    <> 
    <Header/>
    <Container className='mt-5'  >

    { cartItems.items && cartItems.items.length >0?

    
    <Row>
  
    <h1 className='text-center mt-3 fw-bold'>Shopping Cart</h1>
        <Col lg={8}>
              
                <Table >
                 <thead >
                   <tr>
                     <th>Product detail</th>

                     <th>Quantity</th>
                     <th>size</th>
                     <th>price</th>
                     <th>Remove</th>
                   </tr>
                 </thead>
                 <tbody  className='p-5 pd-5 border  border-2'>
                   
                     
                 {cartItems &&  cartItems.items && cartItems.items.map(item => (

                    <tr className='p-5 ' key={item.productId}>
                   
                      <td>
                      <img className='pe-5 text-center' height={'70px'} src={`${apiUrl}/uploads/${item.image}`} alt={item.name} />
                      {item.name}
                      </td>
                    
                      <td style={{width:'40px'}}>
                        <InputGroup style={{width:'50px'}}>
                          <FormControl
                            type="number"
                            value={item.quantity}
                          />
                        </InputGroup>
                      </td>
                      <td>{item.size}</td>
                      <td>{item.price}</td>
                     
                      <td>
                        <i onClick={()=>removeItem(item.productId)} class="fa-solid fa-xmark text-danger fs-3"></i>
                    
                      </td>
                    </tr>
                  ))
                
              
               
              }
                 </tbody>
               </Table>
            
        </Col>
    
        <Col lg={4}>
          
        <div>
        <div className='col-lg-4 ms-5'>
        <div className='container mb-3  shadow  rounded-2 border-secondary ' style={{height:'370px',width:'310px',background:'#fcfaf7'}}>
         
          <div className='mt-2 ms-3'>
          <h3 className='font-italic fw-bolder'>Total</h3>
            <div className='mt-3 pt-2 '>
                <h5 className='font-italic'>Sub-total:<span className='ms-4 fw-bold'>₹{totalAmount}</span></h5>
                
                <h5 className='font-italic'> Delivery : <span className='ms-5 text-success'>0</span></h5>
              <h5 className='font-italic'>Total:<span className='ms-5 ps-3 fw-bold'>₹{totalAmount}</span></h5>
            </div>
            <button onClick={handleCheckout} className='btn btn-success w-100 mt-3'>Check Out</button>

            <h5 className='mt-3'>We Accept </h5>
            <div className=''>
            <img className='img-fluid' style={{height:'60px',width:'350px'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Abf3c5YG9SnFdpjfwTQ2btKjWFjRQ-s_lJJAANa95zfk2BZH'></img>
            
            </div>
          </div>
        </div>
        </div>
             
            
        </div>
       
          </Col>
          
        
             
    </Row>
    :
    
   <div className='mb-5'> 
   <img style={{height:'400px',width:'400px'}} className='rounded mx-auto d-block' src={cartlogo} alt='cartlogo'/>
   <h4 className='text-center fw-bold'>No items in cart</h4>
   <Link to="/shop" style={{textDecoration:'none'}}><button  className='btn btn-primary d-block mx-auto mt-3'>Shop Now</button></Link>
   </div>


  }
      
     </Container>
     <Footer/>
    
    </>
   
  );
};

export default Cart;