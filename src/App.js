import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import Game from './Game'; // Import the Game component
import Login from './Login';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <Game /> // Display the game after the user logs in
        ) :
          (
            <Login />
          )}
      </div>
    );
  }
}

export default App;
