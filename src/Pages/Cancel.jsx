import React from 'react'

function Cancel() {
  return (
<>
<div style={{background:'grey',height:'100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}} className='container-fluid'>
        <i style={{fontSize:'100px'}} className="fa-solid fa-circle-exclamation text-center text-danger"></i>
        <h1 className='text-center mt-5 fw-bold'>Payment Failed.</h1>
      </div>
</>
  )
}

export default Cancel