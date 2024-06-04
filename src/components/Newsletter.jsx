import React from 'react'

function Newsletter() {
  return (
    <div className='w-100 newsletter' > 
    <h1 className='text-center text-light fw-bold'>  Join our Newsletter</h1>
    <p className=' text-center text-light'>  Get the latest trend  updates and offers right to your inbox!</p>
   <div className='d-flex justify-content-center'> <input className='form-control w-50 p-2 ' type='email' placeholder='Enter your email ...'/>
   <button className='btn p-2   btn-primary'>Subscribe</button>
   </div>

      </div>
  )
}

export default Newsletter