import React from 'react'
import { PlusCircle } from 'react-feather'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideo } from '../service/allapi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({handleRes}) {

  const [uploadData, setuploadData] = useState({
    id: "", caption: "", thumbnail: "", url: ""
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInput = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target
    setuploadData({ ...uploadData, [name]: value })
    // ...uploadData:::spread operator is used for showing all data as a single object if we dont use it id,caption,thumbnail,url all these data will be separately shown in console

  }
  console.log(uploadData);
  // original url :https://www.youtube.com/watch?v=WWr9086eWtY


  // url that going to be stored in backend src="https://www.youtube.com/embed/WWr9086eWtY"
  const extractUrl = (e) => {
    let youtubeUrl = e.target.value
    if (youtubeUrl.includes("v=")) {
      let index = youtubeUrl.indexOf("v")
      console.log(index);

      let videourl = youtubeUrl.substring(index + 2, index + 13)
      console.log(videourl);

      let videoData = uploadData

      videoData.url = `https://www.youtube.com/embed/${videourl}`
      setuploadData(videoData)
    }
    console.log(uploadData);
  }
  // define handleadd
  const handleAdd = async () => {
    // destructure uploadData state

    const { id, caption, thumbnail, url } = uploadData
    if (!id || !caption || !thumbnail || !url) { toast("please fill the form completely") }

    else {

      // make an api call
      const response = await addVideo(uploadData)
      // console.log(response);
       handleRes(response.data)
      if (response.status >= 200 && response.status < 300) {

        toast.success("new video uploaded successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
// to close the window
        setShow(false)
      }
      else {

        toast.warn("provide a unique id!!!",{
          position: "top-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light"
        })
      }




    }
  }

  return (
    <>
      <div onClick={handleShow}>
        <PlusCircle color='blue' size={90} />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <FloatingLabel className='mb-3' controlId="floatingId" label="Uploading video id">
              <Form.Control type="text" placeholder="Video id" name='id' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingCaption" label="Uploading video caption">
              <Form.Control type="text" placeholder="Video caption" name='caption' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingImage" label="Uploading video cover image url">
              <Form.Control type="text" placeholder="Video cover image URL" name='thumbnail' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingLink" label="Uploading video link">
              <Form.Control type="text" placeholder="Video Link" name='url' onChange={extractUrl} />
            </FloatingLabel>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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

export default Add