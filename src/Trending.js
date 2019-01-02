import React, { Component } from 'react';
import './Trending.css';

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded : false,
      items : [],
      selectedImage : "",
    }
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.generateRowContents = this.generateRowContents.bind(this);
  }

  componentDidMount() {
    const url = "https://api.giphy.com/v1/gifs/trending?api_key=";
    const api_key = "0d05b586e3ff4884b6dc9837d9601726";
    const limit = 24;
    fetch(url+api_key+"&limit="+limit)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded : true,
          items : json,
        })
      })
  }

  handleMouseClick(id) {
    console.log(id);
    this.setState({
      selectedImage : id
    })
  }

  generateRowContents(items){
    let content = []
    let cols = 4;
    let rows = 6;
    for(let i = 0; i < cols; i++) {
      let children = []
      for(let j = 0; j < rows; j++) {
        let index = i * rows + j;
        children.push(<img key={items.data[index].id} src={items.data[index].images.fixed_height.url} alt={items.data[index].title}/>)
      }
      content.push(<div className="column">{children}</div>)
    }
    return content;
  }

  render() {
    var {isLoaded, items} = this.state;

    if(!isLoaded) {
      return <div>Loading</div>;
    }
    else {
      return (
        <div className="row">
          {this.generateRowContents(items)}
        </div>
      );
    }
  }
}

export default Trending;
