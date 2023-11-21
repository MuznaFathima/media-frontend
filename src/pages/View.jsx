import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideo } from '../service/allapi'
useState

function View({serverResponse}) {

  //create state allVideos for storing api calls response. since we got response as an array of objects initial value of state is empty array
  const[allVideos,setallVideos]=useState([])

  const[deleteStatus,setdeleteStatus]=useState(false)
  const getallVideos=async()=>{

  let response= await getVideo()
  // console.log(response.data);
  // here all this work only if the getallVideos is called. here there is no button or anything. so we need to show the content when the page loads. to view a content when the page loads  use hook called useEffect 


  setallVideos(response.data)
  }
  console.log(allVideos);

  useEffect(() => {
    getallVideos()
  
    
  }, [serverResponse,deleteStatus])
  

  const handleDeleteStatus=(res)=>{
    setdeleteStatus(res)

  }
  return (
    <div className='border p-3 rounded'>
<Row>
  { 
  allVideos.map(video=>(
    <Col className='ps-3 mb-3' sm={12} md={6} >

<Videocard 
card={video}  
handleDeleteStatus={handleDeleteStatus}/>
    </Col>
  ))
 
  
  }
 
</Row>

    </div>
  )
}

export default View