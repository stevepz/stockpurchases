import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const StockEdit = (props) => {

  console.log('stocksedit', props)
  if (!props.stockFormData.id) {
    props.mountEditForm(props.id)
  }

  return (
    <div className="stock-add-container">
      <h2>View/Edit/Delete Stock</h2>
      <hr />
      <form onSubmit={props.handleEditStock} >
        <p>Stock Name:</p>
        <input name="stockname" type="text" onChange={props.handleStockChange} value={props.stockFormData.stockname} />
        <p>Ticker:</p>
        <input name="stockticker" type="text" onChange={props.handleStockChange} value={props.stockFormData.stockticker} />
        <p>Comment:</p>
        <input name="comment" type="text" onChange={props.handleStockChange} value={props.stockFormData.comment} />

        <hr />
        <button>Edit</button>
      </form>


      <button onClick={() => {
        console.log('delete id', props.id)
        props.handleDeleteStock(props.id);
      }}>Delete</button>


      <Link id="purchase-add" className="header-link"
        to={`/users/${props.user.id}/stocks/${props.id}/add`}>
        <button className="purchase-add-button">Add Purchase</button>
      </Link>

      <Link id="purchase-edit" className="header-link" to={`/users/${props.user.id}/stocks/${props.id}`}>
        <button className="purchase-edit-button">View/Edit/Delete a Purchase</button>
      </Link>

      <Link id="back" className="header-link" to={`/users/${props.user.id}/stocks`}>
        <button className="back">BACK</button>
      </Link>
    </div>
  );
}

export default StockEdit;