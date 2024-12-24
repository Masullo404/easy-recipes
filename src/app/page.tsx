import ImgSection from "@/components/home-page/bg-image-sectoin";
import CustomizedCarousel from "@/components/home-page/carousel";
import styles from "../styles/homepage-styles.module.css"
import Link from "next/link";
import { Button } from "react-bootstrap";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Easy Recipes',
  description: 'The rigth place to learn new recipes',
}
 
export default function Home() {
  return (
    <div >
      <ImgSection url="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      title="Easy-recipes" text="some random here"/>
      
      <section className={styles.SecondDiv}>
      <img src="https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="a person cooking" className={styles.SecondDivImg}/>
        <div className="text-center">
          <h2 >Your favorite food in just one place?</h2>
          <p >Yes! Easy Recipes provides you a extraordinary experience for those who love to cook and learn new things!</p>
          <Button>Nice!</Button>
        </div>
      </section>

      <div className="text-center mt-5 mb-3">
        <p className="h1">Why to use Easy Recipes?</p>
      </div>
      <section className={styles.ThirdDiv}>
        <div className="d-flex flex-column align-items-center">
          <img src="https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="a person seasoning salt" />
          <p className="text-center w-80">Easy Recipes provides a centralized platform where users can 
            quickly find a variety of recipes tailored to their preferences, dietary needs, or available ingredients.</p>
            <Button className={styles.linkBtn}><Link href={"/recipes"} className={styles.link}>See Recipes</Link></Button>
        </div>
        
        <div className="d-flex flex-column align-items-center">
        <img src="https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        alt="man cooking" />
          <p className="text-center w-80">The marketplace encourages a sense of community by allowing users to share their own recipes 
            and discover unique dishes from others. This interaction fosters creativity and helps users explore new cuisines.</p>
            <Button className={styles.linkBtn}><Link href={"/recipes"} className={styles.link}>See Recipes</Link></Button>
        </div>
        
        <div className="d-flex flex-column align-items-center">
        <img src="https://images.pexels.com/photos/5737454/pexels-photo-5737454.jpeg?auto=compress&cs=tinysrgb&w=600" 
        alt="person reading a recipes book" />
          <p className="text-center w-80">Users can quickly find simple, step-by-step recipes that are easy to follow, 
            making it ideal for those who don’t want to spend hours searching for or preparing meals</p>
          <Button className={styles.linkBtn}><Link href={"/recipes"} className={styles.link}>See Recipes</Link></Button>
        </div>
      </section>

      <section className="bg-black d-flex  justify-content-around p-5 mt-5">
        <div className="bg-dark text-light d-flex flex-column align-items-center justify-content-center p-5 rounded-3">
          <h3>Get in touch!</h3>
          <p>fill the next form to guarantee a weekly</p>
        </div>
        <div className="bg-dark text-light w-50 rounded">
          <form action="" className="d-flex flex-column text-light align-items-center p-5">
            <label htmlFor="name" className="w-100">Enter your name</label>
            <input type="text" className="w-100 mb-3"/>

            <label htmlFor="email" className="w-100">Enter your email</label>
            <input type="text" className="w-100 mb-3" />

            <label htmlFor="comment" className="w-100">Enter a comment</label>
            <textarea name="comment" id="comment"  className="w-100 mb-3"></textarea>

            <Button type="submit" className="w-50 m-3">Submit</Button>
          </form>
        </div>
      </section>

      <section>
        <CustomizedCarousel items={
          [
            {
              src:"https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              title:"Easy Recipes",text:"One"
            },
            {
              src:"https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600",
              title:"Easy recipes",text:"of"
            }

          ]}  />
      </section>

    </div>
  );
}
