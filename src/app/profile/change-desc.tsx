"use client"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { user } from '@prisma/client';


export function ChangeDescription() {
   const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Change Your Bio
      </Button>
      <ChangeDescriptionBox
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

interface ChangeDescriptionBoxProps {
  show: boolean;
  onHide: () => void;
}

export function ChangeDescriptionBox({ show, onHide }: ChangeDescriptionBoxProps) {
    const { data: session, status } = useSession()
    const [user,setUser] = useState<user|null>(null)
    if(user === null){
      fetch("/api/getUserBySession").then(result => result.json())
      .then(result => setUser(result))
      .catch(err => console.log(err))
    }

    return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Your Bio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Bio:</h4>
          <form action="/api/updateUser" method="post">
            <label htmlFor="bio"></label>
              <input type="text" placeholder={user?.bio} name='bio' /> <br /><br />
              <Button type='submit'>Change Bio</Button>
          </form>
        </Modal.Body>
      </Modal>
   </div>
  );
}
export function Bio(){
  const [user,setUser] = useState<user|null>(null)
  if(user === null){
    fetch("/api/getUserBySession").then(result => result.json())
    .then(result => setUser(result))
    .catch(err => console.log(err))
  }
  return(
    <p>{user?.bio}</p>
  )
}