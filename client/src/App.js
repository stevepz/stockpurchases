import React from 'react';
import './App.css';
import { Route, Link, withRouter } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Stocks from "./components/Stocks";
import StocksAdd from "./components/StocksAdd";
import StocksEdit from "./components/StocksEdit";



import {
  loginUser,
  registerUser,
  verifyUser,
  showUser,
  addStock,
  editStock,
  deleteStock
} from "./services/api-helper";


class App extends React.Component {
  constructor() {
    super();
    this.state = {

      user: {},
      stock: {},
      purchase: {},
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
    const stock = await editStock(this.state.stock.id, this.state.stockFormData);
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
    this.props.history.push('/users/${user.id}/stocks')
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
          />}
        />
        <Route
          exact
          path="/users/:id/stocks/add"
          render={() => <StocksAdd
            handleAddStock={this.handleAddStock}
            handleStockChange={this.stockHandleChange}
            stockFormData={this.state.stockFormData}
            currentUser={this.state.currentUser}
            user={this.user}
            resetStockForm={this.resetStockForm}
          />}
        />
        <Route
          exact
          path="/users/:id/stocks/:id/edit"
          render={(props) => {
            const { id } = props.match.params;
            console.log('stock', this.state.user)
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
            />
          }}
        />

      </div>
    )
  }
};


export default withRouter(App);
