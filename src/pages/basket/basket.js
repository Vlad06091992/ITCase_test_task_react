import {toJS} from "mobx";
import {store} from "../../store/store";
import {useEffect, useState} from "react";
import {getProductByData} from "../../utils/getProductByData";
import {useNavigate} from "react-router-dom";
import styles from './basket.module.scss'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Basket = () => {
    const productsInBasket = store.productsInBasket;
    const [products, setProducts] = useState(null);
    const navigate = useNavigate()
    console.log('render')
    const notify = () => toast("товар удален из корзины!");
    const fetchData = async () => {
        try {
            const promisesArray = productsInBasket.map(async (el) => {
                const productData = await getProductByData(el.productId, el.color.id, el.size.id, el.productIdUnical);
                return productData;
            });

            const results = await Promise.all(promisesArray);
            setProducts(results);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [productsInBasket]);

    const handleDeleteProduct = (productIdUnical) => {
        store.deleteProductFromBasket(productIdUnical);
        fetchData();
    };

    if (products) {
        return (
            <div>
                <ToastContainer autoClose={1500} position="top-center" theme={'colored'} />
                <button className={styles.button} onClick={() => {
                    navigate('../products')
                }}>Вернуться к продуктам
                </button>
                <div className={styles.products}>
                    {products.map((el) => (
                        <div key={el.productIdUnical}>
                            <img style={{maxWidth: '300px', height: "auto"}} src={el.images[0]} alt={el.name}/>
                            <div>{el.name}</div>
                            <div>{el.description}</div>
                            <div>{el.size}</div>
                            <button onClick={() =>{
                                notify()
                                handleDeleteProduct(el.productIdUnical)}}>Удалить товар</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};