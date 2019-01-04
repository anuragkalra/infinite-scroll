import React from 'react';
import TrendingInfiniteColumn from './TrendingInfiniteColumn';
import DisplayImages from './DisplayImages.js';
import Experiment from "react-ab-test/lib/Experiment";
import Variant from "react-ab-test/lib/Variant";
import emitter from "react-ab-test/lib/emitter";

class SearchContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      items: [] ,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  fetchResults(props) {
    const url = "https://api.giphy.com/v1/gifs/search?api_key="
    const api_key = "0d05b586e3ff4884b6dc9837d9601726"
    const limit = 20;
    const offset = 0;
    const query = this.state.value;
    const request = `${url}${api_key}&limit=${limit}&offset=${offset}&q=${query}`;
    fetch(request)
      .then(result => result.json())
      .then(json => {
        this.setState({
          items : json.data,
          isLoaded: true
        });
    })
  }

  onButtonClick(e){
    emitter.emitWin("Win Emitted");
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const buttonStyle1 = {
      backgroundColor: '#4CAF50'
    }

    const buttonStyle2 = {
      backgroundColor: '#AABBFF'
    }
    let contentC;
    let contentD;
    if(this.state.value.length === 0){
      contentC = (
        <div>
          <input type="text" placeholder="Search Gifs" id="search" value={this.state.value} onChange={this.handleChange} className="form-control "/>
          <button style={buttonStyle1} type="submit" value="Submit"
           onClick = {() => {
             this.fetchResults(this.state.searchQuery)
             this.onButtonClick()
             }
           }
         className="btn btn-default">
           Submit
         </button>
          <TrendingInfiniteColumn />
        </div>
      )
      contentD = (
        <div>
          <input type="text" placeholder="Search Gifs" id="search" value={this.state.value} onChange={this.handleChange} className="form-control "/>
          <button style={buttonStyle2} type="submit" value="Submit"
           onClick = {() => {
             this.fetchResults(this.state.searchQuery)
             this.onButtonClick()
             }
           }
         className="btn btn-default">
           Submit
         </button>
          <TrendingInfiniteColumn />
        </div>
      )
    }
    else {
      contentC = (
        <div className="form-inline" onFocus={() => this.setState({items:[]})}>
           <input type="text" placeholder="Search Gifs" id="search" value={this.state.value} onChange={this.handleChange} className="form-control "/>
           <button style={buttonStyle1} type="submit" value="Submit"
            onClick = {() => {
              this.fetchResults(this.state.searchQuery)
              this.onButtonClick()
              }
            }
          className="btn btn-default">
            Submit
          </button>
           <DisplayImages items={this.state.items}/>
        </div>
      )

      contentD = (
        <div className="form-inline" onFocus={() => this.setState({items:[]})}>
           <input type="text" placeholder="Search Gifs" id="search" value={this.state.value} onChange={this.handleChange} className="form-control "/>
           <button style={buttonStyle2} type="submit" value="Submit"
            onClick = {() => {
              this.fetchResults(this.state.searchQuery)
              this.onButtonClick()
              }
            }
          className="btn btn-default">
            Submit
          </button>
           <DisplayImages items={this.state.items}/>
        </div>
      )
    }

    return (
      <Experiment ref="experiment1" name="stylesExperiment1">
        <Variant name="C">
          {contentC}
        </Variant>
        <Variant name="D">
          {contentD}
        </Variant>
      </Experiment>
    )
  }
}

// Called when a 'win' is emitted, in this case by emitter.emitWin()
emitter.addWinListener(function(experimentName, variantName){
  console.log("Variant ‘" + variantName + "’ of experiment ‘" + experimentName + "’ was clicked");
});
export default SearchContainer;
