"use client"
import { Carousel } from "react-bootstrap";

export default function RecipesPageCarousel(){
    return(
        <>
        <Carousel>
            <Carousel.Item>
                <img src="/image.jpeg"
                width={500} height={500}
                alt="responsive img" className='img-fluid w-100 ' style={{height:"60vh",objectFit:"cover",filter:"brightness(0.7)"}}
                />        
                <Carousel.Caption  className='h-100 p-0 d-flex flex-column justify-content-center' >
                <div className='text-start'>
                    <p className="h1">Find Your Recipes Here</p>
                    <p className='w-75'>Easy Recipes</p>
                </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img src="/pexels-photo-5718074.jpeg"
                width={500} height={500}
                alt="responsive img" className='img-fluid w-100 ' style={{height:"60vh",objectFit:"cover",filter:"brightness(0.7)"}}
                />
                <Carousel.Caption  className='h-100 p-0 d-flex flex-column justify-content-center' >
                <div className='text-start'>
                    <p className="h1">Easy and Simple</p>
                </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </>
    )
}