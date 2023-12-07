import styles from "./card.module.scss"
import {Link} from "react-router-dom";

export const Card = (props) => {
    // if(props)
    // debugger
    // console.log(props)
    return <div>
        <div className={styles.color}>{props.product.name}</div>
        <img className={styles.image} src={props.product.colors[0].images[0]}/>
 <div>
     <Link to={`../product/${props.product.id}`}>
     <button onClick={()=>{
         console.log(props.product.id)
     }}>Подробнее</button>
     </Link>
 </div>

    </div>
}