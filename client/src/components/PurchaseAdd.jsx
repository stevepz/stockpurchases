import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const PurchaseAdd = (props) => {
  if (props.purchaseFormData.id) {
    props.resetpurchaseForm()
  }

  return (
    <div className="stock-add-container">
      <h2>Add Purchase</h2>
      <hr />
      <form onSubmit={props.handleAddPurchase} >
        <p>Purchase Date:</p>
        <input name="purchasedate" required type="date" value={props.purchaseFormData.purchasedate} onChange={props.handlePurchaseChange} />
        <p>Number of Shares:</p>
        <input name="qty" type="number" required value={props.purchaseFormData.qty} onChange={props.handlePurchaseChange} />
        <p>Price Per Share:</p>
        <input name="pricepaid" type="number" required value={props.purchaseFormData.pricepaid} onChange={props.handlePurchaseChange} />
        <p>Comment:</p>
        <textarea name="comment" onChange={props.handlePurchaseChange} value={props.purchaseFormData.comment}></textarea>

        <hr />
        <button>Record Purchase</button>
      </form>
      <Link id="back" className="header-link" to={`/users/${props.currentUser.id}/stocks/${props.stockId}/edit`}>
        <button className="back">BACK</button>
      </Link>
    </div>
  );
}

export default PurchaseAdd;