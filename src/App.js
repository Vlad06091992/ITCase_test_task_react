import React, {useEffect} from 'react'
import {Link, Outlet, useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import {store} from "./store/store";

export  const App = observer( () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('./products')
    }, [navigate]);


    return (
        <div className="App">
            <header className="App-header">
                <Link to={"/basket"}>
                    <button disabled={store.productsInBasket.length < 1}>перейти в корзину</button>
                </Link>
                <p>Продуктов в корзине:{store.productsInBasket.length}</p>
                <Outlet/>
            </header>
        </div>
    )
})
