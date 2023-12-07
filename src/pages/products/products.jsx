import {useEffect, useState} from "react";
import {getProducts} from "../../services/api";

export const Products = () => {

    useEffect(async () => {
       let products = await getProducts()
        setProducts(products)
    }, [getProducts]);

    const [products,setProducts] = useState()
if(products)
    return <div>{products.map(el=><div>{el.name}</div>)}</div>
}