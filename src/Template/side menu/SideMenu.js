import React from "react";
import Categories from "../../Components/Categories";
import CartModal from "../../Components/CartModal";
import Example from "../../Components/Example";

const SideMenu = () => {

    return(
        <>
          <Categories/>
          <CartModal/>
          <Example/>
        </>
    )
}

export default SideMenu;
