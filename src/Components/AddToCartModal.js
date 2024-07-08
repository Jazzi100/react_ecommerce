import React from 'react';
import CartModal from './CartModal'; // Adjust the import path as needed

function AddToCartModal({ show, item, onHide, qty }) {
  return (
    <>
      
      <CartModal show={show} placement="end" onHide={onHide} item={item} qty={qty} />
    </>
  );
}

export default AddToCartModal;
