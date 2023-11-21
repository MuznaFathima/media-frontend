import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getVideos, getallCategories, updateCategory } from '../service/allapi';
import { useEffect } from 'react';
import { Trash2 } from 'react-feather';
import { Col, Row } from 'react-bootstrap';
import Videocard from './Videocard';

function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [allCategory, setallCategory] = useState([])
  const [categoryItem, setcategoryItem] = useState({

    id: "", name: "", allVideos: []
  })




  const addcategoryForm = (e) => {

    const { name, value } = e.target
    setcategoryItem({ ...categoryItem, [name]: value })
  }
  console.log(categoryItem);

  const handleAddCategory = async (e) => {

    e.preventDefault()
    const { id, name } = categoryItem
    if (!id || !name) {
      { toast("please fill the form completely") }


    }
    else {
      let response = await addCategory(categoryItem)
      toast.success("category added successfully")
      console.log(response);
      getcategoryList()
      setShow(false)
    }
  }

  // to get all categories

  const getcategoryList = async () => {

    const response = await getallCategories()
    console.log(response.data);
    setallCategory(response.data)
  }

  useEffect(() => {
    getcategoryList()

  }, [])

  const handleDeletecategory = async (e, id) => {
    e.preventDefault()
    console.log(id);
    await deleteCategory(id)
    getcategoryList()

  }
  const dragover = e => {
    e.preventDefault()
    console.log("dragging over the category board!!!!");


  }
  const dropped = async (e, categoryId) => {
    console.log(categoryId);
    let sourceCardId = e.dataTransfer.getData("cardId")
    console.log(sourceCardId);
    // logic to implement adding card in the given categories
    let { data } = await getVideos(sourceCardId)
    console.log('source video data', data);


    let selectedCategory = allCategory.find(item => item.id == categoryId)
    console.log("target category details", selectedCategory);
    selectedCategory.allVideos.push(data)
    console.log('updated target category details', selectedCategory);

    await updateCategory(categoryId, selectedCategory)
    getcategoryList()
  }


  return (
    <>
      <div className="d-grid">
        <div onClick={handleShow} className='btn btn-dark mt-2'>Add Category</div>
          {
            allCategory?.map(item => (

              <div droppable onDragOver={e => dragover(e)}
                onDrop={e => dropped(e, item?.id)}
                className='d-flex justify-content-between border rounded mt-2 p-3'>
                <h4>{item.name}</h4>



                <span onClick={e => handleDeletecategory(e, item?.id)}>
                  <Trash2 color='red' />
                </span>


                <Row>
                  {item?.allVideos.map((card) => (
                    <Col className='p-3 mb-1 sm={12}' >
                      <Videocard card={card} insideCategory={true}/>
                    </Col>


                  ))


                  }
                </Row>

              </div>

            ))
          }

       


      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' controlId="floatingLink" label="Id">
            <Form.Control type="text" onChange={addcategoryForm} placeholder="Id" name='id' />
          </FloatingLabel>
          <FloatingLabel className='mb-3' controlId="floatingLink" label="Category">
            <Form.Control type="text" onChange={addcategoryForm} placeholder="Category" name='name' />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>

  )
}

export default Category