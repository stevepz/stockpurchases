import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const StocksAdd = (props) => {
  if (props.stockFormData.id) {
    props.resetStockForm()
  }


  return (
    <div className="stock-add-container">
      <h2>Add Stock</h2>
      <hr />
      <form onSubmit={props.handleAddStock} >
        <p>Stock Name:</p>
        <input name="stockname" required type="text" value={props.stockFormData.stockname} onChange={props.handleStockChange} />
        <p>Ticker:</p>
        <input name="stockticker" required type="text" value={props.stockFormData.stockticker} onChange={props.handleStockChange} />
        <p>Comment:</p>
        <textarea name="comment" onChange={props.handleStockChange} value={props.stockFormData.comment}></textarea>
        {/* <input name="comment" type="text" value={props.stockFormData.comment} onChange={props.handleStockChange} /> */}

        <hr />
        <button>Add</button>
      </form>
      <Link id="back" className="header-link" to={`/users/${props.currentUser.id}/stocks`}>
        <button className="back">BACK</button>
      </Link>
    </div>
  );
}

export default StocksAdd;