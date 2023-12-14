import {store} from "../../store/store";
import {useEffect, useState} from "react";
import {getProductByData} from "../../utils/getProductByData";
import {useNavigate} from "react-router-dom";
import styles from './basket.module.scss'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CardBasket} from "../../components/card-basket/card-basket";

export const Basket = () => {
    const productsInBasket = store.productsInBasket;
    const [products, setProducts] = useState(null);
    const notify = () => toast("товар удален из корзины!");
    const fetchData = async () => {
        try {
            const promisesArray = productsInBasket.map(async (el) => {
                const productData = await getProductByData(el.productId, el.color.id, el.size.id, el.productIdUnical,el.name,el.color.label);
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
                <ToastContainer autoClose={500} position="top-center" theme={'colored'} />
                <div className={styles.products}>
                    {products.map((product) => (
                       <CardBasket key={product.productIdUnical} handleDeleteProduct={handleDeleteProduct} notify={notify} {...product}/>
                    ))}
                </div>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};