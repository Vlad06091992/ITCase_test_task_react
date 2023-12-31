import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {store} from "../../store/store";
import {observer} from "mobx-react";
import {getSizeToViewModel} from "../../utils/getSizeToViewModel";
import styles from './product.module.scss'
import {v4 as uuidv4} from 'uuid';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {toJS} from "mobx";

export const Product = observer(() => {

    const {productId} = useParams()
    const currentProduct = store.currentProduct
    const currentColorProduct = store.currentColorProduct
    const sizes = store.sizes
    const navigate = useNavigate()
    const isBasket = store.isBasket
    const notify = () => toast("товар добавлен в корзину!");
    const [color, setColor] = useState(currentProduct?.colors?.map(el => ({
        id: el.id,
        label: el.name,
        value: el.name
    }))[0])
    const [size, setSize] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                await store.getSizes()
                await store.getProductById(productId);
                await store.getProductColor(productId, store.currentProduct?.colors[0]?.id)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData()

        return ()=>{
            store.setCurrentColorProduct(null)
            setColor(null)
            setSize(null)
        }

    }, []);


    if (currentProduct && currentColorProduct) {
        return (<div className={styles.container}>
            {!isBasket && <ToastContainer autoClose={500} position="top-center" theme={'colored'} />}
            <div>
                <div>{currentProduct.name}</div>
                {currentColorProduct.images.map(el=> <img key={el} className={styles.image} alt={currentColorProduct.name} src={el}/>)}
                <div>Цена : {currentColorProduct.price}</div>

            </div>
            <div className={styles.selects}>
                <div>
                    <Select className={styles.select} placeholder={'Выберите цвет'}
                            onChange={(color) => {
                                store.toggleIsBasketState()
                                setColor(color)
                                setSize(null)
                                store.getProductColor(productId, color.id)
                            }}
                            options={currentProduct.colors.map(el => ({id: el.id, label: el.name, value: el.name}))}/>
                </div>
                <div>
                    {currentColorProduct.sizes.length ?
                        <Select className={styles.select} value={size} escapeClearsValue={true} name={'2'}
                                placeholder={'Выберите размер'}
                                onChange={(size) => {
                                    store.toggleIsBasketState()
                                    setSize(size)
                                    store.setCurrentSize(size.id)
                                }}
                                options={currentColorProduct?.sizes?.map(size => getSizeToViewModel(sizes, size))}
                        /> : <div>На данную позицию нет размеров</div>}
                </div>
                <button disabled={!size || !color || isBasket} onClick={() => {
                    notify()
                    const productForBasket = {
                        name: store.currentProduct.name,
                        productIdUnical: uuidv4(),
                        productId: store.currentProduct.id,
                        color,
                        size
                    }

                    store.setProductInbasket(productForBasket)
                }}>Добавить в корзину
                </button>
            </div>
            {isBasket && <p>Продукт уже был добавлен в корзину !!!</p>}
            <button onClick={()=>{navigate('../products')}}>Вернуться к продуктам</button>
        </div>)
    } else {
        return <div>Loading...</div>;
    }
})