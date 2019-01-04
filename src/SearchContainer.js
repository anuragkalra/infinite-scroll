import React from 'react';
import TrendingInfiniteColumn from './TrendingInfiniteColumn';
import DisplayImages from './DisplayImages.js';

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
    const url_no_query = "https://api.giphy.com/v1/gifs/search?api_key=0d05b586e3ff4884b6dc9837d9601726&limit=10&offset=0&rating=G&lang=fr&q=";
    fetch(url_no_query+this.state.value)
      .then(result=>result.json())
      .then(res => {
        this.setState({
          items : res.data,
          isLoaded: true
        });
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const {isLoaded} = this.state
    if(this.state.value.length == 0){
      return (
        <div>
          <input type="text" placeholder="Search Gifs" id="search" value={this.state.value} onChange={this.handleChange} className="form-control "/>
          <button type="submit" value="Submit" onClick={() => {this.fetchResults(this.state.searchQuery)}} className="btn btn-default">Submit</button>
          <TrendingInfiniteColumn />
        </div>
      )
    }
    else {
      return (
        <div className="form-inline" onFocus={() => this.setState({items:[]})}>
           <input type="text" placeholder="Search Gifs" id="search" value={this.state.value} onChange={this.handleChange} className="form-control "/>
           <button type="submit" value="Submit" onClick={() => {this.fetchResults(this.state.searchQuery)}} className="btn btn-default">Submit</button>
           <DisplayImages items={this.state.items}/>
        </div>
      )
    }
  }
}

export default SearchContainer;
