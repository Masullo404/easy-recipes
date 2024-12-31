"use client"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import { user } from '@prisma/client';
import styles from "../../../styles/my-profile/style.module.css"


export function ChangeDescription() {
   const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary"  className='w-50 align-self-center' onClick={() => setModalShow(true)}>
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
    const [user,setUser] = useState<user|null>(null)
    const [bioValue,setBioValue] = useState<string>('')
    if(user === null){
      fetch("/api/getUserBySession").then(result => result.json())
      .then(result => setUser(result))
      .catch(err => console.log(err))
    }
    useEffect(()=>{
      setBioValue(String(user?.bio))
    },[user])
    function verifyBio(ev:FormEvent){
      if(bioValue.length <= 40){
          ev.preventDefault()
          alert('Your Bio must have at least 40 characters')
      }
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
              <textarea name="bio" id="bio" cols={80} rows={4} value={bioValue} onChange={(ev)=>setBioValue(ev.target.value)}
              ></textarea><br /><br />
              <Button type='submit' onClick={verifyBio}>Change Bio</Button>
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
    <p className={styles.bio}>{user?.bio}</p>
  )
}

