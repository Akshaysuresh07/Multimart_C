
import React, { useContext, useEffect, useState } from 'react'
import { Container ,Row,Col,Button,Card,ButtonGroup} from 'react-bootstrap'
import  './productView.css'
import Header from '../../components/Header'
import Footer from '../../components/footer/Footer'
import { addToCartApi, getSingleProductsApi } from '../../Services/allApi'
import { apiUrl } from '../../Services/apiUrl'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from '../../components/Review'
import { useDispatch, useSelector } from 'react-redux'
import { AddtoCart } from '../../Redux/Slice/CartSlice'
import { AuthContext } from '../../context/Authcontext'
function ProductView() {
  const navigate=useNavigate()
  const[productDetails,SetProductDetails]=useState({})
  const [load, setLoad] = useState(true);
  const [selectedSize,  setSelectedSize] = useState(null);
  const { pid } = useParams()
  const[qty,setQty]=useState(1)
parseInt(qty)
  console.log('Type of qty:', typeof qty);
const dispatch=useDispatch()
const{isAuthorised, setIsAuthorised}=useContext(AuthContext)

  const sizes = [ 'S', 'M', 'L', 'XL'];

  console.log(pid);
  console.log(productDetails);
  const similarProducts = [
    { id: 1, name: 'Black Biker5000', price: '$499', imgUrl: 'https://www.crewclothing.co.uk/images/products/large/MKB029_WHITE.jpg' },
    { id: 2, name: 'Pink Shirt', price: '$399', imgUrl: 'https://cdnc.lystit.com/photos/9a5a-2015/11/10/jcrew-black-midweight-flannel-shirt-in-stewart-plaid-product-0-830062526-normal.jpeg' },
    { id: 3, name: 'Pink Shirt', price: '$399', imgUrl: 'https://www.crewclothing.co.uk/images/products/large/MKB029_WHITE.jpg' },
    { id: 4, name: 'Pink Shirt', price: '$399', imgUrl: 'https://cdnc.lystit.com/photos/9a5a-2015/11/10/jcrew-black-midweight-flannel-shirt-in-stewart-plaid-product-0-830062526-normal.jpeg' }
  ];
  const getaProduct=async()=>{

    const result=await getSingleProductsApi(pid)
    console.log(result);
    if(result.status==200){
      SetProductDetails(result.data)
      setLoad(false)
    }

  }
  
  const handleAddtoCart = async () => {
    const reqBody = {
      productId: pid,
      quantity: qty,
      size: selectedSize,
      image:productDetails.productImage,
      name:productDetails.name,
      price:productDetails.price*qty

    };
    console.log(reqBody);
  
    const token = sessionStorage.getItem('token');
    console.log(token);
    if(!token){
      toast.error('Please login to add product to cart')
      // navigate('/login')
    }
    
    else{
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
   
    try {
      if(selectedSize==null || qty==0 ){
        toast.error('Please select size')
      }
      else{
        const res = await addToCartApi( reqBody,headers);
      console.log(res);
  
      if (res.status ==200) {
        dispatch(AddtoCart(res.data));
        

        toast.success('Product added to cart');
    
        
    
      }
      }
      
    } catch (error) {
      console.error(error);
      
    }
  }

  };
  console.log(qty);
  useEffect(()=>{
    getaProduct()

  },[])
  return (
    <>
    <Header/>

   {load? <h2>loading</h2> 
    :<Container>
    <Row>
      <Col md={7}>

        <div className='mt-4 ms-4 '>
        <img className='align-center' height={'430px'} src={`${apiUrl}/uploads/${productDetails.productImage}`} alt="Purple Warm Zip Jacket"/></div>
        
      </Col>
      <Col md={5}>
        {/* Product details */}
        <div className='mt-5'>
          <h2>{productDetails.name}</h2>
          <h3>₹{productDetails.price}</h3>
          <p>{productDetails.description}.</p>
          <div className="rate">
          <div className="stars">
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
        </div>
        </div>
       
     <div className='mb-3 mt-3  '>
          <ButtonGroup>
        {sizes.map(size => (
          <Button value={size}  onClick={() => setSelectedSize(size)} key={size}  className={`me-2  ${selectedSize == size ? 'selected' : 'bg-secondary text-light border-1  p-2'}`}>

            {size}
          </Button>
        ))}
      </ButtonGroup>
     </div>


       <div className='d-flex mt-5 '>
       <input style={{width:'80px',height:'50px'}}
       className="form-control border-1 me-3"
       type="number"
       placeholder="1"
       value={qty}
       onChange={(e)=>setQty(e.target.value)}
      
       
     />
          <Button onClick={handleAddtoCart} className=' me-5 ps-3' variant="primary">Add To Cart</Button>
          
       </div>
      </Col>
    </Row>
    <Review/>

    <h4 className='mt-5 fs-3'>Similar Product</h4>
    <Row>
      {similarProducts.map(product => (
        <Col className='mb-3 mt-5' lg={3} key={product.id}>
          <Card className='shadow' >
            <Card.Img height={'230px'} variant="top" src={product.imgUrl} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>


}
    <Footer/>
    <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default ProductView