import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'





function Landingpage() {
  
  // useNavigate() is a hook  ----  assign it to variable
  const navigate=useNavigate()
  const handleNavigate=()=>{
  // navigate to home page   


     navigate('/home')
  }
  return (
    <div>
        <Row className='align-items-center'>

            <Col></Col>
            <Col lg={6}>
                <h1>Welcome to Videoo.com</h1>
                <p>Where user can use their favourite videos user can upload any youtubr videos by copy and pasre their url.videoo.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop. it is free. try it now!!!!!!</p>
                <button onClick={handleNavigate} className='btn btn-primary'>Click here to know more!!</button>
            </Col>
            <Col lg={4}>
                <img className='img-fluid'  src="https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="no image" />
            </Col>
            <Col></Col>
        </Row>
    </div>
  )
}

export default Landingpage