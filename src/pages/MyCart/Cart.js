import React from "react";
import Home from "./Home";
import { useCart } from "react-use-cart";

const Cart = () => {
    const { 
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    if(isEmpty) return <h2 className="text-center">Your Cart is Empty</h2>
    return(
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h5>Cart ({totalUniqueItems})</h5>
                </div>
            </div>
        </section>
    )
}

export default Cart;