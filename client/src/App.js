import React from 'react';
import './App.css';
import { Route, withRouter } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Stocks from "./components/Stocks";
import StocksAdd from "./components/StocksAdd";
import StocksEdit from "./components/StocksEdit";
import PurchaseAdd from "./components/PurchaseAdd";
import PurchaseEdit from "./components/PurchaseEdit";


import {
  loginUser,
  registerUser,
  verifyUser,
  showUser,
  addStock,
  editStock,
  deleteStock,
  addPurchase,
  editPurchase,
  deletePurchase
} from "./services/api-helper";


class App extends React.Component {
  constructor() {
    super();
    this.state = {

      user: {},
      stock: {},
      stockId: '',
      purchase: {},
      purchaseId: '',
      currentUser: '',
      currentStock: '',
      currentPurchase: '',
      function: '',

      authFormData: {
        username: "",
        password: ""
      },

      stockFormData: {
        stockname: '',
        stockticker: '',
        comment: '',
        user_id: ''
      },

      purchaseFormData: {
        purchasedate: '',
        qty: 0,
        pricepaid: 0,
        comment: '',
        stock_id: ''
      }
    }
  }

  async componentDidMount() {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
      this.props.history.push(`/users/${this.state.currentUser.id}/stocks`)
    }
    else {
      this.props.history.push(`/`);
    }
  }

  resetStockForm = (stock) => {
    this.setState({
      stockFormData: {
        stockname: '',
        stockticker: '',
        comment: '',
        user_id: ''
      }
    })
  }

  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({ currentUser });
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks`)
  }

  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser });
    }
    if (this.state.currentUser.id > 0) {
      this.props.history.push(`/users/${this.state.currentUser.id}/stocks`);
    } else {
      this.props.history.push(`/`);
    }
  };

  handleLogout = () => {
    this.setState({
      currentUser: {},
      user: {}
    });
    localStorage.removeItem("authToken");
    this.props.history.push(`/`);
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks`)
  }

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  getData = async (e) => {
    const user = await showUser(this.state.currentUser.id);
    this.setState({ user });
  }


  handleStockChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      stockFormData: {
        ...prevState.stockFormData,
        [name]: value
      }
    }));
  }

  handleAddStock = async (e) => {
    e.preventDefault();
    const stock = await addStock(this.state.currentUser.id, this.state.stockFormData);
    this.setState({ stock });
    this.resetStockForm()
    const user = await showUser(this.state.currentUser.id);
    this.setState({ user });
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks`)
  }

  handleEditStock = async (e) => {
    e.preventDefault();

    // const stock = await editStock(this.state.stock.id, this.state.stockFormData);
    await editStock(this.state.stock.id, this.state.stockFormData);
    const user = await showUser(this.state.currentUser.id);
    this.setState({ user });
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks`)
  }
  mountStockEditForm = async (id) => {
    const stocks = this.state.user.stocks
    const stock = stocks.find(el => el.id === parseInt(id));
    this.setState({
      stockFormData: stock
    });
  };

  handleDeleteStock = async (id) => {
    await deleteStock(id, this.state.currentUser.id);
    this.getData()
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks`)
  }

  noUser = () => {
    this.props.history.push('/')
  }


  // *******************************************

  setStockId = (stockId) => {
    this.setState({ stockId });
    const stock = this.state.user.stocks.find(el => el.id === parseInt(stockId));
    this.setState({ stock });
  }


  resetPurchaseForm = () => {
    // const today = new Date()
    // console.log('today', today)
    this.setState({
      purchaseFormData: {
        purchasedate: "",
        qty: 0,
        pricepaid: 0,
        comment: '',
        stock_id: ''
      }
    }
    )
  }

  handlePurchaseChange = (e) => {
    const { name, value } = e.target;
    const stock_id = this.state.stockId
    this.setState(prevState => ({
      purchaseFormData: {
        ...prevState.purchaseFormData,
        [name]: value
      }
    }))
    this.setState(prevState => ({
      purchaseFormData: {
        ...prevState.purchaseFormData,
        stock_id
      }

    }))
  }

  setupStockToPurchase(stockid) {
    this.setStockId(stockid);
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks/${this.state.stockid}/purchases/add`);
  }

  handleAddPurchase = async (e) => {
    e.preventDefault();
    const purchase = await addPurchase(this.state.currentUser.id, this.state.stockId, this.state.purchaseFormData);
    this.setState({ purchase });
    this.resetPurchaseForm()
    const user = await showUser(this.state.currentUser.id);
    this.setState({ user });
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks/${this.state.stockId}/edit`)
  }

  handleEditPurchase = async (e) => {
    e.preventDefault();
    // const purchase = await editPurchase(this.state.purchase.id, this.state.purchaseFormData);
    await editPurchase(this.state.purchase.id, this.state.purchaseFormData);
    const user = await showUser(this.state.currentUser.id);
    this.setState({ user });
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks/${this.state.stock.id}/edit`)

    // `/users/${props.currentUser.id}/stocks/${props.stockId}/edit`

  }
  mountPurchaseEditForm = async (id) => {
    //need stock id and purchase id
    const purchases = this.state.stock.purchases
    const purchase = purchases.find(el => el.id === parseInt(id));
    this.setState({
      purchaseFormData: purchase
    });
    this.setState({
      purchase
    });
  };

  handleDeletePurchase = async (id) => {
    //need stock id and purchase id
    await deletePurchase(this.state.currentUser.id, this.state.stockId, id);
    this.getData()
    this.props.history.push(`/users/${this.state.currentUser.id}/stocks`)
  }


  setupPurchase = (purchaseId) => {
    this.setState({ purchaseId });
    this.props.history.push(`/users/${this.state.user.id}/stocks/${this.state.stockId}/purchases/${purchaseId}/edit`);
    // window.scrollTo(0, 0);
  }


  setPurchaseId = (purchaseId) => {
    this.setState({ purchaseId });
    const purchase = this.state.stock.purchases.find(el => el.id === parseInt(purchaseId));
    this.setState({ purchase });
  }

  render() {

    return (
      <div className="App">
        <Header
          user={this.state.currentUser}
          handleLogout={this.handleLogout}
        />
        <Route
          exact
          path="/"
          render={() => <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />}
        />
        <Route
          exact
          path="/register"
          render={() => <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />}
        />
        <Route
          exact
          path="/users/:id/stocks"
          render={() => <Stocks
            currentUser={this.state.currentUser}
            getData={this.getData}
            user={this.state.user}
            setStockId={this.setStockId}
            stockId={this.state.stockId}
            setupStockToPurchase={this.setupStockToPurchase}
            noUser={this.noUser}
          />}
        />
        <Route
          exact
          path="/users/:id/stocks/add"
          render={() => <StocksAdd
            handleAddStock={this.handleAddStock}
            handleStockChange={this.handleStockChange}
            stockFormData={this.state.stockFormData}
            currentUser={this.state.currentUser}
            user={this.user}
            resetStockForm={this.resetStockForm}
            noUser={this.noUser}

          />}
        />
        <Route
          exact
          path="/users/:id/stocks/:id/edit"
          render={(props) => {
            const { id } = props.match.params;
            const stock = this.state.user.stocks.find(el => el.id === parseInt(id));
            return <StocksEdit
              id={id}
              stock={stock}
              user={this.state.user}
              handleStockChange={this.handleStockChange}
              stockFormData={this.state.stockFormData}
              mountEditForm={this.mountStockEditForm}
              handleEditStock={this.handleEditStock}
              handleDeleteStock={this.handleDeleteStock}
              setStockId={this.setStockId}
              stockId={this.state.stockId}
              setupPurchase={this.setupPurchase}
              noUser={this.noUser}
            />
          }}
        />

        <Route
          exact
          path="/users/:id/stocks/:id/purchases/add"
          render={() => <PurchaseAdd
            handleAddPurchase={this.handleAddPurchase}
            handlePurchaseChange={this.handlePurchaseChange}
            purchaseFormData={this.state.purchaseFormData}
            currentUser={this.state.currentUser}
            user={this.state.user}
            resetPurchaseForm={this.resetPurchaseForm}
            stockId={this.state.stockId}
            noUser={this.noUser}
            stock={this.state.stock}
          />}
        />
        <Route
          exact
          path="/users/:id/stocks/:id/purchases/:id/edit"
          render={(props) => {
            const { id } = props.match.params;

            // const purchase = this.state.user.stocks.purchases.find(el => el.id === parseInt(id));
            return <PurchaseEdit
              id={id}
              purchase={this.state.purchase}
              stock={this.state.stock}
              user={this.state.user}
              handlePurchaseChange={this.handlePurchaseChange}
              purchaseFormData={this.state.purchaseFormData}
              mountEditForm={this.mountPurchaseEditForm}
              handleEditPurchase={this.handleEditPurchase}
              handleDeletePurchase={this.handleDeletePurchase}
              setPurchaseId={this.setPurchaseId}
              purchaseId={this.state.purchaseId}
              noUser={this.noUser}
            />
          }}
        />

      </div>
    )
  }
};

// path = "/"
// path = "/register"
// path = "/users/:id/stocks"
// path = "/users/:id/stocks/add"
// path = "/users/:id/stocks/:id/edit"
// path = "/users/:id/stocks/:id/purchases/add"
// path = "/users/:id/stocks/:id/purchases/:id/edit"

export default withRouter(App);

