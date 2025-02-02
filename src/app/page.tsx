import CustomizedCarousel from "@/components/home-page/carousel";
import styles from "../styles/home-page/homepage-styles.module.css"
import Link from "next/link";
import Image from 'next/image'
import { Button } from "react-bootstrap";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Easy Recipes',
  description: 'The rigth place to learn new recipes',
}
 
export default function Home() {
  return (
    <div className="bg-light">
      <section className={styles.section}>
            <img src={"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
            alt="food image" className={styles.img}/>
            <div className={styles.contentSection}>
                <h1>Easy Recipes</h1>
                <p>Here you find the right recipe with just a few clicks</p>
                <Button className="btn" href="/recipes">See Recipes</Button>
            </div>
      </section>
      
      <section className={styles.SecondDiv}>
        <Image src={"https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=600"}
        alt="food image" 
        width={600}
        height={600}
        className={styles.SecondDivImg}/>
  
        <div className="text-center">
          <h2>Many Meals in a single place</h2>
          <p className="text-center">Easy Recipes provides you a simple searching system that allows you to find as many dishes  as you want<br/>
            Try it now and enjoy all the facilities given to you!
           </p>
          <Button href="/recipes">Give it a try</Button>
        </div>
      </section>

      <div className="text-center mt-5 mb-3 d-flex flex-column align-items-center">
        <p className="h1">Why to use Easy Recipes?</p>
        <hr className="w-50"/>
      </div>

      <section className={styles.ThirdDiv}>
        <div className={"d-flex flex-column align-items-center bg-white "+styles.ThirdDivCards}>
          <Image src={"https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600"}
          alt="a person seasoning food with salt"
          width={600}
          height={600}
          className={styles.SecondDivImg}
          />
          <p className="text-center">Easy Recipes provides a centralized platform where users can 
            quickly find a variety of recipes tailored to their preferences, dietary needs, or available ingredients.</p>
            <Button className={styles.linkBtn}><Link href={"/recipes"} className={styles.link}>See Recipes</Link></Button>
        </div>
        
        <div className={"d-flex flex-column align-items-center bg-white "+styles.ThirdDivCards}>
          <Image src={"https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt="a person seasoning food with salt"
            width={600}
            height={600}
            className={styles.SecondDivImg}
          />
          <p className="text-center w-80">The marketplace encourages a sense of community by allowing users to share their own recipes 
            and discover unique dishes from others. This interaction fosters creativity and helps users explore new cuisines.</p>
            <Button className={styles.linkBtn}><Link href={"/recipes"} className={styles.link}>See Recipes</Link></Button>
        </div>
        
        <div className={"d-flex flex-column align-items-center bg-white "+styles.ThirdDivCards}>
          <Image src={"https://images.pexels.com/photos/5737454/pexels-photo-5737454.jpeg?auto=compress&cs=tinysrgb&w=600"}
            alt="a person seasoning food with salt"
            width={600}
            height={600}
            className={styles.SecondDivImg}
          />
          <p className="text-center w-80">Users can quickly find simple, step-by-step recipes that are easy to follow, 
            making it ideal for those who don&apos;t want to spend hours searching for or preparing meals</p>
          <Button className={styles.linkBtn}><Link href={"/recipes"} className={styles.link}>See Recipes</Link></Button>
        </div>

      </section>

      <section className="mt-5 mb-5 ">
        <CustomizedCarousel items={
          [
            {
              src:"https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              title:"Here you find everything you imagine!",
              text:`Do you want to know how to cook that delicous meal that you always wanted to?
               Click the fellow button and start to navigate throw an inumerous ideias of the community!`
            },
            {
              src:"https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600",
              title:"A practical and flexible searching",text:"just with a fex clicks you find the kind of meal you want to prepare!"
            }

          ]} />
      </section>

      <section className="d-flex justify-content-around p-5 bg-light" >
        <main className={"d-flex justify-content-center p-3 rounded w-75 p-5 bg-white shadow "+styles.ContactDiv}>
          <div className=" d-flex flex-column align-items-center justify-content-center rounded-3 w-50">
            <Image src={"https://img.freepik.com/free-vector/online-assistant-user-help-frequently-asked-questions-call-center-worker-cartoon-character-woman-working-hotline_335657-2336.jpg?ga=GA1.1.2117397043.1731783481&semt=ais_hybrid"}
            alt="man using a computer"
            width={550}
            height={550}
            className="w-100 img-fluid"
            />
          </div>
          <div className={"d-flex flex-column align-items-center justify-content-center rounded w-75 "}>
            <p className="display-2">Get in Touch!</p> 
            <form className={"d-flex flex-column w-100 align-items-center  "+styles.ContactForm }>
              <label htmlFor="name" className="w-100">Enter your name</label>
              <input type="text" className="w-100 mb-3 p-2 rounded border-1" placeholder="Jhon Doe"/>

              <label htmlFor="email" className="w-100">Enter your email</label>
              <input type="text" className="w-100 mb-3 p-2 rounded border-1" placeholder="jhondoe@gmail.com" />

              <label htmlFor="comment" className="w-100">Enter a comment</label>
              <textarea name="comment" id="comment"  className="p-2 rounded w-100 mb-3 border-1" rows={5} cols={40}
              placeholder="Leave your comment here"></textarea>

              <Button type="submit" className={"w-50 m-3"}><span className={styles.submitBtn}>Submit</span></Button>
            </form>
          </div>
        </main>
      </section>

    </div>
  );
}
