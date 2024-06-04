import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCartApi,addOrderApi } from '../Services/allApi'

function Success() {
  const [load, setLoad] =useState(false)
  // const addOrder = async () => {
  //   const token = sessionStorage.getItem('token')
  //   const reqHeaders = {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${token}`
  //   };
  
  // }



  return (
    <>
    <div>
    {load ? <p>loading </p>: <div style={{ minHeight: '80vh' }} className='w-100 mt-5 d-flex justify-content-center flex-column align-items-center'>
        <img height={'150px'} width={'150px'} src="https://th.bing.com/th/id/R.a1c1a8331f107deedf8ef54de1b257e3?rik=oqQ50DLg6fye8A&riu=http%3a%2f%2fcraftizen.org%2fwp-content%2fuploads%2f2019%2f02%2fsuccessful_payment_388054.png&ehk=Em4ImyRV5nk%2bEJIoj56uumAei6qyyq8J7UZVyyjeqIM%3d&risl=&pid=ImgRaw&r=0" alt="" />
        <h1 className='text-green-400 text-3xl mt-5 text-center font-bold'>Payment Successfull</h1>
        <h1 className='text-white bg-green-900 px-6 py-2 text-2xl mt-5 text-center font-bold'>Amount paid : $</h1>
        <Link className='  text-dark' to={'/'}>Back to home</Link>
    </div>}
</div>
    </>
  )
}

export default Success