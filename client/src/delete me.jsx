import React, { Component } from 'react'

const PruchaseAdd = (props) => {

  return (
    <div className="stock-add-container">
      <h2>Add Purchase</h2>
      <hr />
      <form onSubmit={props.handleAddPurchase} >
        <p>Stock Name: </p>
        <p>Purchase: </p>
        <input name="stockname" type="text" value={props.purchaseFormData.stockname} onChange={props.handlePurchaseChange} />
        <p>Ticker:</p>
        <input name="stockticker" type="text" value={props.purchaseormData.stockticker} onChange={props.handlePurchaseChange} />
        <p>Comment:</p>
        <input name="comment" type="text" value={props.purchaseFormData.comment} onChange={props.handlePurchaseChange} />

        <hr />
        <button>Add</button>
      </form>
    </div>
  );
}

export default PurchaseAdd;