import styles from "./card.module.scss"

export const Card = (props) => {
    // if(props)
    // debugger
    // console.log(props)
    return <div>
        <div className={styles.color}>{props.product.name}</div>
        <img className={styles.image} src={props.product.colors[0].images[0]}/>
 <div>
     <button onClick={()=>{
         console.log(props.product.id)
     }}>Подробнее</button>
 </div>

    </div>
}