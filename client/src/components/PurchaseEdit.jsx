import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const PurchaseEdit = (props) => {



  if ((props.purchase.id != props.id)) {
    props.setPurchaseId(props.id)
    props.mountEditForm(props.id)
  }

  const purchases = props.stock.purchases
  const purchase = purchases.find(el => el.id === parseInt(props.id));


  return (
    <div className="stock-add-container">
      <h2>View/Edit/Delete Purchase for {props.stock.stockname}</h2>


      <form onSubmit={props.handleEditPurchase} >
        <p>Purchase Date:</p>
        <input name="purchasedate" required type="date" value={props.purchaseFormData.purchasedate} onChange={props.handlePurchaseChange} />
        <p>Number of Shares:</p>
        <input name="qty" type="number" required value={props.purchaseFormData.qty} onChange={props.handlePurchaseChange} />
        <p>Price Per Share:</p>
        <input name="pricepaid" type="number" required value={props.purchaseFormData.pricepaid} onChange={props.handlePurchaseChange} />
        <p>Comment:</p>
        <textarea name="comment" onChange={props.handlePurchaseChange} value={props.purchaseFormData.comment}></textarea>


        <button>Update Purchase</button>
      </form>

      <button onClick={() => {
        props.handleDeletePurchase(props.id);
      }}>Delete</button>


      {/* <Link id="purchase-add" className="header-link"
        to={`/users/${props.user.id}/stocks/${props.stock.id}/purchases/add`}>
        <button className="purchase-add-button">Add Purchase</button>
      </Link> */}



      <Link id="back" className="header-link" to={`/users/${props.user.id}/stocks/${props.stock.id}/edit`}>
        <button className="back">BACK</button>
      </Link>
    </div>
  );
}

export default PurchaseEdit;