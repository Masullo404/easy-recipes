import React from "react"

export type card = {
    src:string,
    description:string,
    name:string,
}
type CardList = {
    styles:string
    cards: card[];
};

const RecipeCard:React.FC<CardList> = ({cards,styles}) => {
    return(
        <div className={`${styles}`}>
            {cards.map((card,index)=>(
                    <div key={index+card.name} className="d-flex flex-column justify-content-between ">
                        <img src={card.src} alt="image" style={{objectFit:"cover"}} className="img-fluid" />
                        <p className="text-center">{card.name}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, dolorem?</p>
                        <button className="btn btn-success">See More</button>
                    </div>
                ))}
        </div>    
    )
}

export default RecipeCard