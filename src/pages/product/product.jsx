import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getProduct} from "../../services/api";
import Select from "react-select";
import {store} from "../../store/store";
import {observer} from "mobx-react";
import {getSizeToViewModel} from "../../utils/getSizeToViewModel";
import styles from './product.module.scss'
import {toJS} from "mobx";
import {v4 as uuidv4} from 'uuid';

export const Product = observer(() => {
    const {productId} = useParams()
    const currentProduct = store.currentProduct
    const currentColorProduct = store.currentColorProduct
    const sizes = store.sizes

    const [color, setColor] = useState(currentProduct?.colors?.map(el => ({
        id: el.id,
        label: el.name,
        value: el.name
    }))[0])
    const [size, setSize] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await store.getProductColor(productId, store.currentProduct?.colors[0]?.id);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData()
    }, []);


    if (currentProduct && currentColorProduct?.sizes) {
        return (<div className={styles.container}>
            <div>
                <div>{currentProduct.name}</div>
                <img className={styles.image} alt={currentColorProduct.name} src={currentColorProduct.images[0]}/>
                <img className={styles.image} alt={currentColorProduct.name} src={currentColorProduct.images[1]}/>
                <div>Цена : {currentColorProduct.price}</div>

            </div>
            <div className={styles.selects}>
                <div>
                    <Select className={styles.select} placeholder={'Выберите цвет'}
                            defaultValue={color}
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
                <button disabled={!size || store.isBasket} onClick={() => {
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
            {store.isBasket && <p>Продукт уже был добавлен в корзину !!!</p>}

        </div>)
    } else {
        return <div>Loading...</div>;

    }

})