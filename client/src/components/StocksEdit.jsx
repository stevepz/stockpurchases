import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const StocksEdit = (props) => {

  if ((props.stockFormData.id != props.id)) {
    props.setStockId(props.id)
    props.mountEditForm(props.id)

  }

  const stocks = props.user.stocks
  const stock = stocks.find(el => el.id === parseInt(props.id));

  return (
    <div className="stock-add-container">
      <h2>View/Edit/Delete Stock for {props.stock.stockname}</h2>
      <hr />
      <form onSubmit={props.handleEditStock} >
        <p>Stock Name:</p>
        <input name="stockname" required type="text" onChange={props.handleStockChange} value={props.stockFormData.stockname} />
        <p>Ticker:</p>
        <input name="stockticker" required type="text" onChange={props.handleStockChange} value={props.stockFormData.stockticker} />
        <p>Comment:</p>
        <textarea name="comment" onChange={props.handleStockChange} value={props.stockFormData.comment}></textarea>
        <hr />
        <button>Edit</button>
      </form>


      <button onClick={() => {
        props.handleDeleteStock(props.id);
      }}>Delete</button>


      {stock.purchases
        ?
        <>
          {stock.purchases.map(purchase => (
            <div key={purchase.id}>
              <div
                key={purchase.id}
                className="stock-line" onClick={(e) => {
                  props.setupPurchase(purchase.id)
                }}>
                <p>purchase date: {purchase.purchasedate} </p>
                <p>number of shares: {purchase.qty}</p>
                <p>price per share: {purchase.pricepaid} </p>
                <p>comments: {purchase.comment} </p>
              </div>
            </div>


          ))}
        </>
        :
        <>
        </>
      }




      <Link id="purchase-add" className="header-link"
        to={`/users/${props.user.id}/stocks/${props.id}/purchases/add`}>

        <button className="purchase-add-button">Add Purchase</button>
      </Link>


      <Link id="back" className="header-link" to={`/users/${props.user.id}/stocks`}>
        <button className="back">BACK</button>
      </Link>
    </div>
  );
}

export default StocksEdit;