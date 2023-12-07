import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import { Card } from "../../components/card/card";
import styles from './products.module.scss';

export const Products = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let productsData = await getProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    if (products) {
        return <div className={styles.container}>{products.map(el => <Card key={el.id} product={el} />)}</div>;
    }

    return <div>Loading...</div>;
};