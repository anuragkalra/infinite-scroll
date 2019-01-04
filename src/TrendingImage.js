import React, { Component } from 'react';

class TrendingImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState(
      {hover: true}
    );
  }

  mouseOut() {
    this.setState(
      {hover: false}
    );
  }

  render() {
    let subtitle;
    let userName;
    if(this.props.showUsername && this.props.item.username) {
        userName = (
          <div>
            Username: {this.props.item.username}
          </div>
        )
    }
    if(this.state.hover) {
      subtitle = (
        <div>
          <figcaption>
          Title: {this.props.item.title}
          <br />
          Rating: {this.props.item.rating}
          <br />
          {userName}
          <br />
          <a href={this.props.item.url} target="_blank" rel="noopener noreferrer">See on Giphy!</a>
          </figcaption>
        </div>
      )
    }

    return (
      <div onMouseOver={this.mouseOver} onMouseLeave={this.mouseOut}>
        <img src={this.props.item.images.preview_gif.url} alt={this.props.item.title}/>
        {subtitle}
      </div>
    )
  }
}

export default TrendingImage;
