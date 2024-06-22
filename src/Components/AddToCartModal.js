import React from 'react';
import CartModal from './CartModal'; // Adjust the import path as needed

function AddToCartModal({ show, item, onHide }) {
  return (
    <>
      
      <CartModal show={show} placement="end" onHide={onHide} item={item}  />
    </>
  );
}

export default AddToCartModal;
