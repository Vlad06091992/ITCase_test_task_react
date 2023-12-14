import styles from "./card.module.scss"
import {useNavigate} from "react-router-dom";
import {store} from "../../store/store";

export const Card = (props) => {
const navigate = useNavigate()
    return <div>
        <div className={styles.color}>{props.product.name}</div>
        <img className={styles.image} src={props.product.colors[0].images[0]}/>
 <div>

     <button onClick={()=>{
         navigate(`../product/${props.product.id}`)
     }}>Подробнее</button>

 </div>

    </div>
}