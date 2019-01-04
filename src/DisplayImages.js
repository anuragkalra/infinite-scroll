import React, { Component } from 'react';
import './App.css';

class DisplayImages extends Component {
    render() {
      return (
        <div className="ImageHolder">
          {
            this.props.items.length > 0 &&
            this.props.items.map(item =>
              (
                <img src={item.images.preview_gif.url} key={item.id} alt={item.title} width="200px" height="200px" />
              )
            )
          }
        </div>
      );
    }
}

export default DisplayImages;
