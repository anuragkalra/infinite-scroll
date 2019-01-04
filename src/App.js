import React from 'react';
import './App.css';
import SearchContainer from './SearchContainer';
import Experiment from "react-ab-test/lib/Experiment"
import Variant from "react-ab-test/lib/Variant"
import emitter from "react-ab-test/lib/emitter"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SearchContainer />
      </div>
    )
  }
}

export default App;
