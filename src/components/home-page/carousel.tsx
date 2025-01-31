"use client"
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

type item = {
  src:string,
  title:string,
  text:string,
}
type items = {
  items:item[]
}
const CustomizedCarousel:React.FC<items> = ({items})=>{
    return (
        <Carousel>

        {items.map((item)=>(
          <Carousel.Item key={item.title}>
          <img alt='responsive image' src={item.src} height={500} width={500} className='img-fluid w-100' style={{height:"90vh",objectFit:"cover",filter:"brightness(0.7)"}}/>
            <Carousel.Caption  className='h-100 p-0 d-flex flex-column justify-content-center' >
              <div className='text-start'>
                <h3>{item.title}</h3>
                <p className='w-75'>
                  {item.text}
                </p>
                <Link href="/recipes"><Button>Find your recipe</Button></Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}

      </Carousel>
    )
}
export default CustomizedCarousel