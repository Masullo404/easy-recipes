"use client"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

export function ChangeImg() {
   const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Change Your Image
      </Button>
      <ChangeImgBox
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

interface ChangeImgBoxProps {
  show: boolean;
  onHide: () => void;
}

export function ChangeImgBox({ show, onHide }: ChangeImgBoxProps) {
    return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Your Profile Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Select The folder</h4>
        <form action="/api/updateUser" method='post' encType="multipart/form-data">
            <label htmlFor="img">Select an archive</label>
            <input type="file" name='img' accept="image/png"/>
            <br />
            <Button type='submit'>Change</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
