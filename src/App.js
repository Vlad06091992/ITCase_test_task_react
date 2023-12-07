import React from 'react'
import {Products} from "./pages/products/products";
import {Outlet} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>корзина :)</p>
<Outlet/>
      </header>
    </div>
  )
}
