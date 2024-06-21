import React from 'react';
import CartModal from './CartModal'; // Adjust the import path as needed

function Example() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <CartModal  placement={placement} name={`Open from ${placement}`} />
        // <CartModal  />
      ))}
    </>
  );
}

export default Example;
