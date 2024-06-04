import React from 'react'
import { Col,Row,Card,Container } from 'react-bootstrap';
import Header from '../../components/Header';

function Dashboard() {
    const items = [
        { id: 1, title: 'Dashboard', link: '/dashboard' },
        { id: 2, title: 'Products', link: '/products' },
       {id: 3, title: 'ADD Products', link: '/AddProduct'},
       {id: 4, title: 'Order', link: '/AddProduct'},
       {id:5, title: 'Category', link: '/AddProduct'},
       {id:6, title: 'Users', link: '/alluser'}
      ];
  return (
   <>
   <Header/>
   <Container fluid>
 
      <Row>
        <Col lg={2} className=" ">
          <div className='sidebar shadow '>
         
                <div className="sidebar-item mt-4 ">
                <h2 className='fw-bold text-warning'>Admin</h2>
                 
                   <div className='d-flex mt-5 '>
                   
                        <h4 Link to ={'/dashboard'}>  <i class="fa-solid fa-house text-primary me-2"></i>Dashboard</h4>
                      
                   </div>
                   <div className='d-flex mt-5 '>
                  
                       <h4 Link to ={'/Products'}><i class="fa-solid fa-bag-shopping me-3"></i>Products</h4>
                     
                  </div>
                  <div className='d-flex mt-5 '>
                 
                      <h4 Link to ={'/dashboard'}><i class="fa-solid fa-cart-plus me-3"></i>Add Products</h4>
                    
                 </div>
                 <div className='d-flex mt-5 '>
                
                     <h4 Link to ={'/dashboard'}><i class="fa-solid fa-list me-3"></i>Category</h4>
                   
                </div>
                <div className='d-flex mt-5 '>
               
                    <h4 Link to ={'/dashboard'}><i class="fa-brands fa-shopify  me-3"></i>Orders</h4>
                  
               </div>
               <div className='d-flex mt-5 '>
              
                   <h4 Link to ={'/dashboard'}><i class="fa-solid fa-user me-3"></i>User</h4>
                 
              </div>
              <div className='d-flex mt-5 '>
             
                  <h4 Link to ={'/dashboard'}></h4>
                
             </div>
                </div>
              
          </div>
        </Col>
        <Col lg={10} className="main-content">
      
            <div  className='d-flex'>
         
            </div>
        </Col>
      </Row>
    </Container>
   </>
  )
}

export default Dashboard