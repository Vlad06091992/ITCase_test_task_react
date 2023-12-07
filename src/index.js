import React from 'react'
import ReactDOM, {createRoot} from 'react-dom/client'

import App from './App'

import './styles/index.css'
import {observer} from "mobx-react";
import {Products} from "./pages/products/products";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Product} from "./pages/product/product";



const RootComponent = observer(() => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            children: [{
                path: '/products',
                element: <Products/>,
            },
                {
                    path: '/product/:productId',
                    element: <Product/>
                }
                ]
        },
    ])




    return (
        // <React.StrictMode>
        <RouterProvider router={router}/>
        // </React.StrictMode>
    );
});

const root = createRoot(document.getElementById("root"));
root.render(<RootComponent />);



// const rootView = document.getElementById('root')
//
// if (rootView) {
//     ReactDOM.render(
//         <React.StrictMode>
//             <RootComponent/>
//         </React.StrictMode>,
//         rootView
//     )
// }



// import React from 'react'
// import ReactDOM from 'react-dom'
//
// import App from './App'
//
// import './styles/index.css'
// import {observer} from "mobx-react";
// import {Products} from "./pages/products/products";
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
//
//
//
// const RootComponent = observer(() => {
//
//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element: <App/>,
//             children: [{
//                 path: '/products',
//                 element: <Products/>,
//             },
//                 // {
//                 //     path: '/product/:productId',
//                 //     element: <ProductDetails/>
//                 // }
//             ]
//         },
//     ])
//
//
//
//
//     return (
//         // <React.StrictMode>
//         <RouterProvider router={router}/>
//         // </React.StrictMode>
//     );
// });
//
// // const rootView = document.getElementById('root')
// //
// // if (rootView) {
// //   ReactDOM.render(
// //     <React.StrictMode>
// //       <App />
// //     </React.StrictMode>,
// //     rootView
// //   )
// // }
//
//
// const root = createRoot(document.getElementById("root"));
// root.render(<RootComponent />);
// // root.render(<Router />);
//
