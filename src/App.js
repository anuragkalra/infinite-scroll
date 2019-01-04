import React from 'react';
import './App.css';
import SearchContainer from './SearchContainer';
import Experiment from "react-ab-test/lib/Experiment"
import Variant from "react-ab-test/lib/Variant"
import emitter from "react-ab-test/lib/emitter"

class App extends React.Component {
  render() {
    return (
      <div>
        <Experiment name="My Example">
          <Variant name="A">
            <div>Version A</div>
            <div className="App">
              <SearchContainer />
            </div>
          </Variant>
          <Variant name="B">
            <div>Version B</div>
            <div className="App">
              <SearchContainer />
            </div>
          </Variant>
        </Experiment>
      </div>
    )
  }
}

// Called when the experiment is displayed to the user.
emitter.addPlayListener(function(experimentName, variantName){
  console.log("Displaying experiment ‘" + experimentName + "’ variant ‘" + variantName + "’");
});

// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener(function(experimentName, variantName){
  console.log("Variant ‘" + variantName + "’ of experiment ‘" + experimentName + "’  was clicked");
});

export default App;
