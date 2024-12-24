"use client"
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
type item = {
  src:string,
  title:string,
  text:string
}
type items = {
  items:item[]
}
const CustomizedCarousel:React.FC<items> = ({items})=>{
    return (
        <Carousel>

        {items.map((item)=>(
          <Carousel.Item key={item.title}>
          <img src={item.src} alt="responsive img" className='img-fluid w-100' style={{height:"40vh",objectFit:"cover",filter:"brightness(0.7)"}}/>
            <Carousel.Caption>
              <div className='text-start ' style={{marginBottom:"5rem"}}>
                <h3>{item.title}</h3>
                <p>
                  {item.text}
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}

      </Carousel>
    )
}
export default CustomizedCarousel