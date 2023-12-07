import React, {useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

export  const App = observer( () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('./products')
    }, [navigate]);


    return (
        <div className="App">
            <header className="App-header">
                <p>корзина :)</p>
                <Outlet/>
            </header>
        </div>
    )
})
