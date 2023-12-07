import React, {useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom";

export default function App() {
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
}
