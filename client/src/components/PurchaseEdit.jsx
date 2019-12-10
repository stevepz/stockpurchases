import React from 'react';
import { Link } from 'react-router-dom';


const PurchaseEdit = (props) => {


  // if (parseInt(props.stock.id) < 1) {
  //   props.nouUser()
  // }

  if ((parseInt(props.purchaseFormData.id) !== parseInt(props.id))) {
    props.setPurchaseId(props.id)
    props.mountEditForm(props.id)
  }

  // const purchases = props.stock.purchases
  // const purchase = purchases.find(el => el.id === parseInt(props.id));


  return (
    <div className="stock-add-container">
      <h2>View/Edit/Delete Purchase for {props.stock.stockname}</h2>


      <form className="purchase-edit-form" onSubmit={props.handleEditPurchase} >
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

        <button>Update Purchase</button>
      </form>

      <button className="stocks-delete-button" onClick={() => {
        props.handleDeletePurchase(props.id);
      }}>Delete</button>


      {/* <Link id="purchase-add" className="header-link"
        to={`/users/${props.user.id}/stocks/${props.stock.id}/purchases/add`}>
        <button className="purchase-add-button">Add Purchase</button>
      </Link> */}



      <Link id="back" className="header-link" to={`/users/${props.user.id}/stocks/${props.stock.id}/edit`}>
        <button className="back">BACK</button>
      </Link>
    </div >
  );
}

export default PurchaseEdit;