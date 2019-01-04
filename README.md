This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all relevant dependencies necessary to run application

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Dependencies

react-ab-test

## Reflection

# Description

Web app that displays the trending GIFs on Giphy. Responsively designed to work on mobile, tablet, and desktop. Users can also search for gifs and see results. On hovering, the user can see more information about the gif.

# Features

This app includes dependency-free infinite scrolling. A/B testing is implemented with the support of the react-ab-test library. First, there is an A/B experiment that is part of the SearchContainer component. This component varies the color of the submit button, and emits a win on the basis of the clicking of the button. Second, there is an A/B experiment as part of the TrendingInfiniteColumn component. We run one variant where the username is visible, and one without. Wins are emitted on the basis of clicking the outbound link for the particular gif on Giphy.com.

# Challenges and Hurdles

In the process of completing the Eaze Growth Engineer Homework, I encountered various challenges, and I tried my best to solve them in the most effective way possible. Though I had some experience using React prior to this project, the Eaze Growth Engineer Homework web app was the most complex react app I have coded till today. One of the primary challenges in this app was dealing with the information that was communicated via the Giphy API. This was the first time I used the Giphy API, so I had to solve many of my problems through trial-and-error. Additionally, I chose to design the app so that the trending results would populate the window by default, and the search results would populate the window as soon as the user began typing. This led to some complications in debugging when managing the state of the app. Another complexity that was a part of the project was creating a responsive app. Because the app receives a set of gif objects of various sizes, this provided some challenge in terms of how to effectively render them to the screen, and still provide a responsive experience. To deal with this, I used the 'fixed_height' version of the gif that the Giphy API provides. Additionally, I used media-queries to adjust the width of the images and column-count styling for the <ul> element that was core to the TrendingInfiniteColumn component. The most difficult part of this assignment was implementing the A/B testing. Though I had some prior knowledge about the methodology behind A/B testing, this was the first time I had implemented it within my own project. To overcome this, I completed research online to understand better how to write effective A/B tests. To aid in my implementation of A/B testing, I used the react-ab-test library. From my experience, there were many commercial options available for A/B testing web apps, and this seemed to be the best and most effectively documented open-source option. In addition to integrating a simple A/B test, one of the challenges was integrating two A/B tests on separate components, as specified in the assignment description. The documentation for react-ab-test was quite good, however slightly confusing in terms of how to implement tests on multiple components. Though I did integrate A/B tests on two components, this process was relatively complicated, and I spent a significant amount of time debugging related issues.

# Optimizations and Improvements

Given the opportunity to improve this web app, there are several features/optimizations that I could add. Firstly, I would migrate the styling to a Sass-based workflow. This would allow more efficient styling, improved reuse of code, and fewer bugs overall. Secondly, I would seek to improve the implementation of the infinite scrolling feature. The TrendingInfiniteColumn component relied on a <ul> element, populated with <li> elements that were the result of the Trending API request. To provide responsive sizing, I modified column-count and width style attributes, depending on the result of the media-query. Though this did work, one of the side-effects of this implementation was that images would be populated in the columns left-to-right. While this was not so noticeable on mobile, this created a column that was momentarily empty until populated by the results of the API request. Additionally, another improvement I could have added would have been to migrate the API information (keys, endpoints, parameters) to a json file, external to the React components that relied on them. With the help of utility functions, I could have created methods such as buildUrl(), which would take parameters such as trending/search, api_key, limit, offset, rating, etc. This would reduce the unnecessary code that was required for building the parameter passed to the fetch() method. 
