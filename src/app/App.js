import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Gallery from './components/Gallery';
import './app.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Gallery />
        </Provider>
      </div>
    );
  }
}

export default App;
