import React from 'react';
import { Link } from 'react-router-dom';



const StocksAdd = (props) => {
  if (props.stockFormData.id) {
    props.resetStockForm()
  }

  if (parseInt(props.currentUser.id) < 1) {
    props.noUser()
  }

  return (
    <div className="stock-add-container">
      <h2>Add Stock</h2>

      <form onSubmit={props.handleAddStock} >
        <div className="stockadd-stocks">
          <p>Stock Name:</p>
          <input className="stockadd-stocks-button" name="stockname" required type="text" value={props.stockFormData.stockname} onChange={props.handleStockChange} />
          <p>Ticker:</p>
          <input className="stockadd-stocks-button" name="stockticker" required type="text" value={props.stockFormData.stockticker} onChange={props.handleStockChange} />
        </div>

        <div className="stockadd-stocks-comments">
          <p>Comment:</p>
          <textarea name="comment" onChange={props.handleStockChange} value={props.stockFormData.comment}></textarea>
        </div>

        <button>Add </button>
      </form>
      <Link id="back" className="back" to={`/users/${props.currentUser.id}/stocks`}>
        <button className="back">BACK</button>
      </Link>
    </div >
  );
}

export default StocksAdd;