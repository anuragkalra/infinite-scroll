import React, { Component } from 'react';
import emitter from "react-ab-test/lib/emitter";
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

  onButtonClick(e){
    emitter.emitWin("Win Emitted");
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
          <a href={this.props.item.url} target="_blank" rel="noopener noreferrer" onClick={this.onButtonClick}>See on Giphy!</a>
          </figcaption>
        </div>
      )
    }

    return (
      <div onMouseOver={this.mouseOver} onMouseLeave={this.mouseOut}>
        <img src={this.props.item.images.fixed_height.url} alt={this.props.item.title}/>
        {subtitle}
      </div>
    )
  }
}

// Called when a 'win' is emitted, in this case by emitter.emitWin()
emitter.addWinListener(function(experimentName, variantName){
  console.log("Variant ‘" + variantName + "’ of experiment ‘" + experimentName + "’ was clicked");
});

export default TrendingImage;
