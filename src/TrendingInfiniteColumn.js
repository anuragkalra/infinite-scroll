import React from 'react';
import './TrendingInfiniteColumn.css';

class TrendingInfiniteColumn extends React.Component {
  state = {
    items : [],
    per: 30,
    page: 1,
    totalPages: null,
    scrolling: false
  }

  componentDidMount() {
    this.loadItems()
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e)
    })
  }

  handleScroll = (e) => {
    const {scrolling, totalPages, page} = this.state;
    if (scrolling) return
    if (totalPages <= page) return
    const lastLi = document.querySelector('ul.gifList > li:last-child')
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    var bottomOffset = 200
    if(pageOffset > lastLiOffset - bottomOffset) this.loadMore()

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
          items: [...items, ...json.data],
          scrolling: false,
          totalPages: 1000
        })
      })
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }), this.loadItems)
  }


  render() {
    return (
      <div>
        <div className="column">
          <ul className="gifList">
            {
              this.state.items.map(item =>
                <li key={item.id}>
                  <img src={item.images.fixed_height.url} alt={item.title}/>
                </li>)
            }
          </ul>
        </div>
        <a onClick={this.loadMore}>Load More</a>
      </div>
    )
  }
}

export default TrendingInfiniteColumn;
