import styles from './card-basket.module.scss'

export const CardBasket = (props) => {
    return (<div key={props.productIdUnical}>
        <img className={styles.cardBasket} src={props.images[0]} alt={props.name}/>
        <div>{props.name}</div>
        <div>{props.description}</div>
        <div>{props.size}</div>
        <div>{props.price}</div>
        <button onClick={() => {
            props.notify()
            props.handleDeleteProduct(props.productIdUnical)
        }}>Удалить товар
        </button>
    </div>)
}