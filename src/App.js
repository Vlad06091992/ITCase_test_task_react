import React, {useEffect} from 'react'
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import {store} from "./store/store";

export  const App = observer( () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('./products')
    }, [navigate]);

    const {pathname} = useLocation()

    return (
        <div className="App">
            <header className="App-header">
                { pathname !== '/basket' && <Link to={"/basket"}>
                    <button disabled={store.productsInBasket.length < 1}>перейти в корзину</button>
                </Link>}
                { pathname === '/basket' && <Link to={"/products"}>
                    <button>вернуться к продуктам</button>
                </Link>}
                <p>Продуктов в корзине:{store.productsInBasket.length}</p>
                <Outlet/>
            </header>
        </div>
    )
})
