import React from 'react';
import { Link } from 'react-router-dom';





const PurchaseAdd = (props) => {
  if (props.purchaseFormData.id) {
    props.resetPurchaseForm()
  }

  if (parseInt(props.currentUser.id) < 1) {
    props.noUser()
  }


  return (
    <div className="stock-add-container">
      <h2>Add Purchase for {props.stock.stockname}</h2>

      <form onSubmit={props.handleAddPurchase} >
        <div className="purchase-edit-date-line">
          <p>Purchase Date:</p>
          <input name="purchasedate" required type="date" value={props.purchaseFormData.purchasedate} onChange={props.handlePurchaseChange} />
        </div>
        <div className="purchase-edit-share-line">
          <p>Number of Shares:</p>
          <input name="qty" type="number" required value={props.purchaseFormData.qty} onChange={props.handlePurchaseChange} />
        </div>
        <div className="purchase-edit-price-line">
          <p>Price Per Share:</p>
          <input name="pricepaid" type="number" required value={props.purchaseFormData.pricepaid} onChange={props.handlePurchaseChange} />
        </div>
        <div className="purchase-edit-comment-line">
          <p>Comment:</p>
          <textarea name="comment" onChange={props.handlePurchaseChange} value={props.purchaseFormData.comment}></textarea>
        </div>
        <button>Record Purchase</button>
      </form>
      <Link id="back" className="header-link" to={`/users/${props.currentUser.id}/stocks/${props.stockId}/edit`}>
        <button className="back">BACK</button>
      </Link>
    </div>
  );
}

export default PurchaseAdd;