import React, { Component } from 'react';
import './App.css';
import './DisplayImages.css'
import TrendingImage from './TrendingImage';

class DisplayImages extends Component {
    render() {
      return (
        <div className="column">
          <ul className="gifList">
            {
              this.props.items.map(item =>
                <li key={item.id}>
                  <TrendingImage name={item.title} item={item}/>
                </li>)
            }
          </ul>
        </div>
      );
    }
}

export default DisplayImages;
