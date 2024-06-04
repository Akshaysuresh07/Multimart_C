import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "react-bootstrap";
import { getAllProductsApi, getSliderProductsApi } from "../Services/allApi";
import { apiUrl } from "../Services/apiUrl";
import { useNavigate } from "react-router-dom";


function SliderHome() {
  const navigate=useNavigate()
  const [homeProducts, setHomeProducts] = useState([])
  const getProducts = async () => {
    const result = await getSliderProductsApi()
    console.log(result);
    if (result.status === 200) {
      setHomeProducts(result.data)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  var settings = {
    dots: true,

    speed: 300,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  return (
    <div style={{overflow:'hidden'}} className="slider-container pb-5 ms-3 mb-5 mt-4">
      <Slider {...settings}>
        {homeProducts.map((item) => (
          <div key={item._id}>
            <Card className='border-1 shadow' style={{ width: '17rem' ,height:'270px'}}>
           
              <img  onClick={() => navigate(`/product/${item._id}`)} height={'210px'} src={`${apiUrl}/uploads/${item.productImage}`}  className="card-img-top" alt="..." />
              <h3 className="fs-5 text-center fw-bold">{item.name.slice(0,20)}</h3>
              <p className="text-center text-secondary fw-bolder">Price: ₹ {item.price}</p>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SliderHome