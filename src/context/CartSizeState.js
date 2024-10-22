import React, { createContext, useState, useEffect } from "react";

const CartSizeContext = createContext();


const CartSizeState = (props) => {
    return (
        <CartSizeContext.Provider value={{ currentUser, login, logout }}>
          {props.children}
        </CartSizeContext.Provider>
      );
}


export { CartSizeState, CartSizeContext };