import React from 'react'

import "./QuantityInput.css"

const QuantityInput = ({quantity, setQuantity, stock}) => {
  return (
    <>
    <button className="quantity_input_button" disabled onClick={() => setQuantity(quantity - 1)}> - </button>
        <p className="quantity_input_count">{quantity}</p>
    <button className="quantity_input_button" onClick={() => setQuantity(quantity + 1)}> + </button>  
    </>
  )
}

export default QuantityInput