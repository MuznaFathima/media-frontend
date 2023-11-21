import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import "./videocardStyle.css"

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddHistory, deleteVideo } from '../service/allapi';
import { v4 as uuidv4 } from 'uuid';
uuidv4
function Videocard({card,handleDeleteStatus,insideCategory}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() =>{
    
    setShow(true);
  
  // to generate id in react automatically
  
 const uid=uuidv4()
 console.log(uid);
  // to generate system date and time
  let cardTime=new Date()
  console.log(cardTime);
  const {caption,url}=card
  if(uid!="",caption!="",cardTime!=""){
    const body={
      id:uid,
      cardName:caption,
      url,date:cardTime
    }
   const response=await AddHistory(body)
   console.log(response);
  }
  
  }



  // js  to jsx use curly brace





  const removeItem=async(id)=>{
      // api call to delete specific card

   let response= await deleteVideo(id)
   console.log(response);
   if(response.status>=200&&response.status<300) {
    handleDeleteStatus(true)
   }
  }

  const dragStarted=(e,id)=>{
    console.log("drag started & source card id"+id);
    e.dataTransfer.setData("cardId",id)
  }
    return (
   <>
    <div>
    <Card draggable onDragStart={e=>dragStarted(e,card?.id)}   className='shadow'>
      <Card.Img onClick={handleShow} variant="top" height={'200px'}   src={card?.thumbnail}  />
      <Card.Body>
        <Card.Title><span>{card?.caption}</span></Card.Title>
       {

        insideCategory?"":
        <Trash2 onClick={()=>removeItem(card?.id)} color='red' style={{float:'right'}}/>
        
        
        }
      </Card.Body>
    </Card>


    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>video caption</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <iframe width={"100%"} height={"400px"} src={`${card?.url}?autoplay=1`} title="Deva Deva - Extended Film Version|Brahmāstra|Amitabh B|Ranbir |@aliabhatt|@pritam7415 |Arijit|Jonita" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </Modal>
    </div>
    </>
  )
}

export default Videocard