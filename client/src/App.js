import React from 'react';
import './App.css';

// import DisplayIt from
//   './components/DisplayIt';
// import { getParkList } from
//   './services/parks-api-helper.js'
// import { getLocation } from
//   './services/geo-api-helper.js'


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
      function: ''
    }
  }

  handleRegister = async registerData => {
    const currentUser = await registerUser(registerData);
    this.setState({ currentUser });
    if (this.state.currentUser.username) {
      this.props.history.push(`/user/${this.state.currentUser.id}/stocks`);
      const getUser = async () => {
        const getData = this.state.user.id;
        const stocks = await indexLocation(
          this.state.currentUser.id,
          getData
        );
        this.setState({ locations });
      };
      getlocations();
    } 

  };

  // handleSelect = (event) => {
  //   let selected = event.target.value
  //   let stateCode = selected.slice(0, 2)
  //   let stateName = selected.slice(3)
  //   this.setState({
  //     newStateCode: stateCode,
  //     newStateName: stateName
  //   })
  // }


  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (this.state.newStateCode) {
  //     let parkList = await getParkList(this.state.newStateCode)
  //     this.setState({
  //       parkList: parkList,
  //       stateName: this.state.newStateName,
  //       stateCode: this.state.newStateCode
  //     })
  //   }
  //   document.getElementById('header-link').click();
  // }

  render() {
    return (
      <div className="App">
        <Header
          user={this.state.currentUser}
          handleLogout={this.handleLogout}
        />
        {!this.state.user && (
          <Login
            function={this.state.function}
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
          />
        )}



      </div>
    )
  };


  //   {/* <Route
  //     exact
  //     path="/"
  //     render={() => (
  //       <HomePage
  //         locations={this.state.allLocations}
  //         currentUser={this.state.currentUser}
  //       />
  //     )}
  //   />

  //   <Route
  //     exact
  //     path="/login"
  //     render={() => <LoginForm handleLogin={this.handleLogin} />}
  //   />


  // ); */}

  export default App;
