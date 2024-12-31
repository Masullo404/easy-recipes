"use client"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from "../../../styles/layout/offcanvas.module.css"
import Link from 'next/link';
import { signOut } from 'next-auth/react'


function MenuOffCanvas() {
  const [show, setShow] = useState(false);
  const logOut = () => signOut()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search,setSearch] = useState('')

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <i className="bi bi-list fs-4 px-2 py-1"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Header closeButton className={styles.offCanvasHead}>
          <Offcanvas.Title>Easy-Recipes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.offCanvasBody}>
            <Link href={"/profile"} className='text-white text-decoration-none fs-3 py-2'>Profile</Link>
            <Link href={"/my_recipes"} className='text-white text-decoration-none fs-3 py-2'>My recipes</Link>
            <Link href={"/recipes/tag/easy-to-do"} className='text-white text-decoration-none fs-3 py-2'>Easy-to-do</Link>
            <Link href={"/recipes/tag/spicy-food"} className='text-white text-decoration-none fs-3 py-2'>Spicy-Food</Link>
            <form action={"/search/"+search} method="GET" className={styles.searchBar+" my-4"}>
                    <input type="text" onChange={(ev)=>setSearch(ev.target.value)} 
                    placeholder="Search for recipes" className={styles.search}/>
            </form>
            <Button onClick={logOut}>Logout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MenuOffCanvas;