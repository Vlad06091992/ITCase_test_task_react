import styles from './card-basket.module.scss'

export const CardBasket = (props) => {
    return (<div className={styles.cardBasket} key={props.productIdUnical}>
        <img className={styles.image} src={props.images[0]} alt={props.name}/>
        <div>Название : {props.name}</div>
        <div>Цвет : {props.color}</div>
        <div>{props.description}</div>
        <div>Размер : {props.size}</div>
        <div>Цена : {props.price}</div>
        <button className={styles.button} onClick={() => {
            props.notify()
            props.handleDeleteProduct(props.productIdUnical)
        }}>Удалить товар
        </button>
    </div>)
}