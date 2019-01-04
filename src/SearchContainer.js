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

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    if(this.state.value.length === 0){
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
