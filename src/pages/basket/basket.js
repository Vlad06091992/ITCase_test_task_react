import {toJS} from "mobx";
import {store} from "../../store/store";
import {useEffect, useState} from "react";
import {getProductByData} from "../../utils/getProductByData";
import {useNavigate} from "react-router-dom";

export const Basket = () => {
    const productsInBasket = toJS(store.productsInBasket);
    const [products, setProducts] = useState(null);
const navigate = useNavigate()
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
                <button onClick={()=>{navigate('../products')}}>Вернуться к продуктам</button>
                <div style={{display: 'flex'}}>
                    {products.map((el) => (
                        <div key={el.name}>
                            <img style={{maxWidth: '300px', height: "auto"}} src={el.images[0]} alt={el.name}/>
                            <div>{el.name}</div>
                            <div>{el.description}</div>
                            <div>{el.size}</div>
                            <button onClick={() => handleDeleteProduct(el.productIdUnical)}>Удалить товар</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};