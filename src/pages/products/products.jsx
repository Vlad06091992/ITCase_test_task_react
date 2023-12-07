import {useEffect} from "react";
import {Card} from "../../components/card/card";
import styles from './products.module.scss';
import {store} from "../../store/store";
import {observer} from "mobx-react";

export const Products = observer(() => {
    const products = store.products

    useEffect(() => {
        const fetchData = async () => {
            try {
             await store.getProducts();
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
});