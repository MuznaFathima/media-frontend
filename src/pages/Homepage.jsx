import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Category from './Category'
import { Link } from 'react-router-dom'
Link


function Homepage() {

  const[serverResponse,setserverResponse]=useState({})

  const handleResponse=(res)=>{

    setserverResponse(res)

  }
  console.log(serverResponse)
  return (
   <>
      <div>
  
        <h1 className='text-info ms-5 mb-5'>All Videocards</h1>
        <Link to={'/watchhistory'}className='d-flex justify-content-end mb-5' style={{ textDecoration: "none", fontSize: "25px", color: "blue" }}>
   Watch history
</Link>
        <Row>

          <Col lg={1}><Add handleRes={ handleResponse}/></Col>
          <Col lg={7}><View serverResponse={serverResponse}/></Col>
          <Col lg={4}><Category/></Col>
        </Row>
      </div>
   </>
  )
}

export default Homepage