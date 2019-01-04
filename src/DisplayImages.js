import React, { Component } from 'react';
import './App.css';
import './DisplayImages.css'

class DisplayImages extends Component {
    render() {
      return (
        <div className="column">
          <ul className="gifList">
            {
              this.props.items.map(item =>
                <li key={item.id}>
                  <img src={item.images.fixed_height.url} alt={item.title}/>
                </li>)
            }
          </ul>
        </div>
      );
    }
}

export default DisplayImages;
