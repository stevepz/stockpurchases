import React from 'react';
import { Link } from 'react-router-dom';


const StocksEdit = (props) => {


  // if ((props.currentUser.id) === undefined) {
  //   props.noUser()
  // }

  // if (parseInt(props.currentUser.id) < 1) {
  //   props.noUser()
  // }

  if ((parseInt(props.stockFormData.id) !== parseInt(props.id))) {
    props.setStockId(props.id)
    props.mountEditForm(props.id)

  }

  const stocks = props.user.stocks
  const stock = stocks.find(el => el.id === parseInt(props.id));

  return (
    <div className="stock-edit-container">
      <h2>View/Edit/Delete Stock for {props.stock.stockname}</h2>

      <form onSubmit={props.handleEditStock} >
        <div className="stockadd-stocks">
          <p>Stock Name:</p>
          <input className="stockadd-stocks-button" name="stockname" type="text" onChange={props.handleStockChange} value={props.stockFormData.stockname} />
          <p>Ticker:</p>
          <input className="stockadd-stocks-button" name="stockticker" type="text" onChange={props.handleStockChange} value={props.stockFormData.stockticker} />
        </div>
        <div className="stockadd-stocks-comments">
          <p>Comment:</p>
          <textarea name="comment" onChange={props.handleStockChange} value={props.stockFormData.comment}></textarea>
        </div>

        <button className="stocks-edit-button">Edit</button>
      </form>


      <button className="stocks-delete-button" onClick={() => {
        props.handleDeleteStock(props.id);
      }}>Delete</button>


      {
        stock.purchases[0]
          ?
          <>
            <div className="stock-purchase-container">
              <p className="stock-purchase-title">Purchase Date</p>
              <p className="stock-purchase-title">Number of Shares</p>
              <p className="stock-purchase-title">Price per Share</p>
              <p className="stock-purchase-title">Comment</p>
            </div>
            {stock.purchases.map(purchase => (
              <div key={purchase.id}>
                <div
                  key={purchase.id}
                  className="purchase-line" onClick={(e) => {
                    props.setupPurchase(purchase.id)
                  }}>
                  <p>{purchase.purchasedate} </p>
                  <p>{purchase.qty}</p>
                  <p>{purchase.pricepaid} </p>
                  <p>{purchase.comment} </p>
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