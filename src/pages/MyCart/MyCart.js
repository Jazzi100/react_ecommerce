import React from "react";
import {Home} from "./Home";
import Cart from "./Cart";
import { CartProvider } from "react-use-cart";

const MyCart = () => {
    return(
        <>
            <CartProvider>
                <Home/>
                <Cart/>
            </CartProvider>
        </>
    )
}

export default MyCart;