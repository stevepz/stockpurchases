import React, { Component } from 'react';
// import EditTeacher from './EditTeacher'
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Stocks extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getData(this.props.currentUser.id);
  }

  sumPurchases = (purchases) => {
    let sum = 0
    purchases.map(purchase => (
      sum = sum + purchase.qty
    ))
    return (sum)
  }

  render() {
    const { user } = this.props;
    // debugger
    return (
      <div>
        <h1>Stocks</h1>
        {user.stocks
          ?
          <>
            {user.stocks.map(stock => (
              <div key={stock.id}>
                <div
                  key={stock.id}
                  className="stock-line"
                  onClick={(e) => {
                    // this.props.setStockId(stock.id)
                    this.props.history.push(`/users/${user.id}/stocks/${stock.id}/edit`);
                    window.scrollTo(0, 0);
                  }}>
                  <h3>
                    <p>{stock.stockname}</p>
                    <p>{stock.stockticker}</p>
                    <p>{stock.comment}</p>

                    {stock.purchases
                      ?
                      <>
                        <p>
                          {this.sumPurchases(stock.purchases)}
                        </p>
                      </>
                      :
                      <>
                      </>
                    }

                  </h3>
                </div>

                {/* <button onClick={() => {
                  this.props.setupStockToPurchase(stock.id);
                }}>Purchase Stock</button> */}



              </div>
            ))
            }
          </>
          :
          <>
          </>
        }
        <Link id="stock-add" className="header-link" to={`/users/${user.id}/stocks/add`}><button className="home-button">Add Stock</button></Link>
      </div>
    )
  }
}

export default withRouter(Stocks);