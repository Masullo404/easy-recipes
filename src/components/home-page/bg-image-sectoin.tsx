import { Button } from "react-bootstrap"
import styles from "../../styles/imgSection.module.css"

export default function ImgSection(props:{url:string,title:string,text:string}){
    return (
        <section className={styles.section}>
            <img src={`${props.url}`} alt="image" className={styles.img}/>
            <div className={styles.contentSection}>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
                <Button className="btn">Click here to see more</Button>
            </div>
        </section>
    )
}