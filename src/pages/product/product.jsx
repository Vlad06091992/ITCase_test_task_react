import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProduct, getProducts} from "../../services/api";
import styles from "../products/products.module.scss";
import {Card} from "../../components/card/card";

export const Product = () => {
    const {productId} = useParams()

    const [product, setProduct] = useState();

    useEffect(() => {
        const [color,setColor] = useState()
        const fetchData = async () => {
            try {
                let productsData = await getProduct(productId);
                setProduct(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    if (product) {
        return (<div>
            <div>{product.name}</div>
            <ul>
                {product.colors.map(el=><li key={el.name}>{el.name}</li>)}
            </ul>

            </div>)
    }

    return <div>Loading...</div>;
}