import React from 'react';
import './TrendingInfinite.css';

class TrendingInfinite extends React.Component {
  state = {
    items : [],
    per: 16,
    page: 0,
    totalPages: null,
  }

  componentWillMount() {
    this.loadItems()
  }

  loadItems = () => {
    const {per, page, items} = this.state;
    const url = "https://api.giphy.com/v1/gifs/trending?api_key=";
    const api_key = "0d05b586e3ff4884b6dc9837d9601726";
    const limit = per;
    const offset = page * per;
    const request = `${url}${api_key}&limit=${limit}&offset=${offset}`;
    fetch(request)
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: [...items, ...json.data]
        })
      })
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }), this.loadItems)
  }

  generateRowContents(items) {
    let content = []
    let cols = 4;
    let rows = items.length / cols;
    for(let i = 0; i < cols; i++) {
      let children = []
      for(let j = 0; j < rows; j++) {
        let index = i * rows + j;
        let element = (
          <div className="container">
            <img key={items[index].id} src={items[index].images.fixed_height.url} alt={items[index].title} className="image"/>
            <div className="overlay">
              <div className="text">{items[index].title}</div>
            </div>
          </div>
        )
        children.push(element)
      }
      content.push(<div className="column">{children}</div>)
    }
    return content;
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.generateRowContents(this.state.items)}
        </div>
        <a onClick={this.loadMore}>Load More</a>
      </div>
    )
  }
}

export default TrendingInfinite;
