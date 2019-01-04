import React from 'react';
import Experiment from "react-ab-test/lib/Experiment";
import Variant from "react-ab-test/lib/Variant";
import emitter from "react-ab-test/lib/emitter";
import TrendingImage from './TrendingImage';
import './TrendingInfiniteColumn.css';

class TrendingInfiniteColumn extends React.Component {
  //by default calls 30 images per page
  //pagination and infinite scrolling implementation
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
    //loads more when the pageOffset if greater than lastLiOffset - bottomOffset, i.e. user is near the bottom of the page
    if(pageOffset > lastLiOffset - bottomOffset) this.loadMore()
  }

  loadItems = () => {
    const {per, page, items} = this.state;
    const url = "https://api.giphy.com/v1/gifs/trending?api_key=";
    const api_key = "0d05b586e3ff4884b6dc9837d9601726";
    const limit = per;
    const offset = page * per;
    const request = `${url}${api_key}&limit=${limit}&offset=${offset}`;
    //keeps previous items and fills in items array using spread operator
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

  //loads more items into the component's state using the previous state's page + 1
  //after this is complete, more items are loaded (with the new, updated page number)
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }), this.loadItems)
  }


  render() {
    return (
      <div>
        <Experiment ref="experiment" name="usernameExperiment1" userIdentifier={this.props.userIdentifier}>
          <Variant name="A">
            <div className="column">
              <ul className="gifList">
                {
                  this.state.items.map(item =>
                    <li key={item.id}>
                      <TrendingImage item={item}/>
                    </li>)
                }
              </ul>
            </div>
          </Variant>
          <Variant name="B">
            <div className="column">
              <ul className="gifList">
                {
                  this.state.items.map(item =>
                    <li key={item.id}>
                      <TrendingImage showUsername="true" item={item}/>
                    </li>)
                }
              </ul>
            </div>
          </Variant>
        </Experiment>
      </div>
    )
  }
}
// Called when the experiment is displayed to the user.
emitter.addPlayListener(function(experimentName, variantName){
  console.log("Displaying experiment ‘" + experimentName + "’ variant ‘" + variantName + "’");
});

export default TrendingInfiniteColumn;
