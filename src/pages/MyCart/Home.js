import React, { useContext } from "react";
import ItemCard from "./ItemCard";
import data from "./data";

function Home() {
  return (
    <>
        <h1 className="text-center mt-3">All Items</h1>
        <section className="py-4 container">
            <div className="row justify-content-center">
                {data.productData.map((item,index)=> {
                    return(
                        <ItemCard 
                            img={item.img} 
                            title={item.title} 
                            desc={item.desc} 
                            price={item.price}
                            key={index}
                            item={item}
                         />
                    );
                })}
                
            </div>
        </section>
    </>
  );
}

function Cart() {
    return (
        <>
            <h1 className="text-center mt-3">All Items</h1>
            <section className="py-4 container">
                <div className="row justify-content-center">
                    {data.productData.map((item,index)=> {
                        return(
                            <ItemCard img={item.img} title={item.title} desc={item.desc} price={item.price} />
                        );
                    })}
                    
                </div>
            </section>
        </>
      );
}

export {Cart , Home};
