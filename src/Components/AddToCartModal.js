import React from 'react';
import CartModal from './CartModal'; // Adjust the import path as needed

function AddToCartModal({ show, item, onHide, qty, userId }) {
  return (
    <>
      
      <CartModal show={show} placement="end" onHide={onHide} item={item} qty={qty} userId={userId} />
    </>
  );
}

export default AddToCartModal;
