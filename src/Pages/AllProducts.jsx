import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer/Footer';
import { Col, Row ,Container,Card,Button} from 'react-bootstrap';
import { getAllProductsApi } from '../Services/allApi';


import { apiUrl } from '../Services/apiUrl';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function AllProducts() {
const navigate=useNavigate()
  const[allProducts,setAllProducts]=useState([])
  const [isLastPage, setIsLastPage] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('all');
  
const productsPerPage = 8;
  useEffect(() => {
      if (location.state?.from === 'header') {
          setSearchbar(true);
      }
  }, [location.state]);
  const handllenext=()=>{
    if (!isLastPage) {
      setPage(prevPage => prevPage + 1);
    }

  }

  const getallProducts=async()=>{
   
  


    try {
      const result=await getAllProductsApi(page,category)
      console.log(result);
      if(result.status==200){
        setAllProducts(result.data)
        setIsLastPage(result.data.length < productsPerPage);
      }

      
    } catch (error) {
      
      console.log(error);
    }
  }


  const handleCategoryClick = (category) => {
    setCategory(category);
  };
  const clearCategorySelection = () => {
    setCategory('all');
  
  };



  useEffect(() => {
    window.scrollTo(0, 0);
    getallProducts()
  }, [page,category]);

  return (
    <>
      <Header/>
      <div style={{height:'100%'}} className='container-fluid w-100'>
        <div className="breadcrumb">
          <a href="/">Home</a> -> <a href="/allproducts">All Products</a>
        </div>
        <h1 className='text-center text-bold'>All Products</h1>
      
        <Container >
        <Row className="mb-5">
          <Col>
            <h2>Category</h2>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
          <div style={{height:'100%'}} className='container-fluid '>
            
              <div className='d-flex '>
                <h4>Filters</h4>
                <a className='ms-4' style={{cursor:'pointer'}} onClick={clearCategorySelection}>Clear</a>
  
              </div>
        
             <div className='mt-'>
                <input className='me-3' onClick={()=>handleCategoryClick('shirt')}  checked={category=== 'shirt'} type="checkbox" id="shirt" name="category" value="shirt"/>
                <label className='fs-5 fst-italic' for="shirt"> Shirt</label><br/>
                <input className='me-3'  onClick={() => handleCategoryClick('Tshirt')}checked={category=== 'Tshirt'}  type="radio" id="Tshirt" name="category" value="Tshirt"/>
                <label className='fs-5 fst-italic' for="Tshirt">Tshirt </label><br/>
                <input className='me-3'  onClick={() => handleCategoryClick('Accessories')} checked={category=== 'Accessories'} type="radio" id="Accessories" name="category" value="Accessories"/>
                <label className='fs-5 fst-italic' for="Accessories">Accessories </label><br/>
                <input className='me-3'  onClick={() => handleCategoryClick('Footwear')} checked={category=== 'Footwear'}  type="radio" id="Footwear" name="category" value="Footwear"/>
                <label className='fs-5  fst-italic' for="Footwear">Footwear </label><br/>
             
             </div>
          </div>
   
          </Col>
          <Col md={9}>
            <Row>
            
               {allProducts.map((items)=>(
                 <Col lg={3} >
                  <Card  className='mt-1 mb-5 prodcard'>
                    <Card.Img style={{height:'140px'}} variant="top" src={`${apiUrl}/uploads/${items.productImage}`} />
                    <Card.Body>
                      <Card.Title>{items.name}</Card.Title>
                      <Card.Text className='text-success'>Free Delivery</Card.Text>
                      <Card.Text>Price<span className='fw-bold'>: {items.price}</span></Card.Text>
                      <Link to={`/product/${items._id}`}>
                      <Button variant="primary">View Item</Button>
                    </Link>
                    </Card.Body>
                  </Card>
                </Col>))}
     
            </Row>
            <div className=' d-flex justify-content-between me-5 mb-4'>
              <button className='btn btn-danger me-3' onClick={() => setPage(prevPage => prevPage - 1)}>Previous</button>
              <button  className=' btn btn-danger ps-4 pe-4 me-3' onClick={handllenext}>Next</button>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
      <Footer/>
    </>
  )
}

export default AllProducts;