import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSpring, animated } from 'react-spring';

import moment from 'moment';

import { useFetch } from '../components/Hooks/useFetch';
import '../fonts/fonts.css';
import Layout from '../components/Layout';
import Landing from '../components/HOC/Landing';
import About from '../components/HOC/About';
import Gallery from '../components/HOC/Gallery.js';
import Stream from '../components/HOC/Stream.js';
import Tour from '../components/HOC/Tour.js';
import Merch from '../components/HOC/Merch.js';
import Nav from '../components/Containers/Nav';
import bg from '../images/IMG_9354.jpg';

const theme = {
  white: '#eeeeee',
  lightGray: '#bebfc1',
  gray: '#5E5F62',
  black: '#040404',
  lightBlue: '#8A9CA2',
  blue: '#427ACA',
  blueGray: '#2E4C6A',
  darkBlue: '#253053',
  red: '#CF0000',
  darkRed: '#9E090B',
  redBrown: '#633C3F',
};

const GlobalStyle = createGlobalStyle`
html{
    font-family: 'miller', "Trirong", "Montserrat", '-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica','Arial','sans-serif','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol', sans-serif; 
    overflow: scroll;
    font-size: 62.5%; 
    box-sizing: border-box;
    ::-webkit-scrollbar {
   display:none ;
}
scrollbar-width: none ;
  
  h1, 
    h2, 
    h3{
      font-family: "Trirong";
      font-style: italic;
    }
  body {
    margin:0;
    font-family: "Montserrat";
    scrollbar-color: transparent transparent;

  }
  @media all and (max-width: 1200px) {
    width: 100%
    html{
      margin: 0;
    }
    h1{
      font-family: "Trirong";
      text-align: center;
    }
    
  }
}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: center;

  div {
    width: 100%;
  }
`;

const HomePage = () => {
  const [pageIndex, setPage] = useState(0);

  const fade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });

  // Instagram call
  const [gallery, galleryLoading] = useFetch(
    `https://graph.facebook.com/v12.0/17841400290867787/media?fields=permalink%2Clike_count%2Ccaption%2Cmedia_type%2Cmedia_url&access_token=${process.env.GATSBY_FACEBOOK_ACCESS_TOKEN}`
  );
  // Youtube call
  const [video, videoLoading] = useFetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbVpSIpg8knuWNftRyXaSQQ&maxResults=1&order=date&type=video&key=${process.env.GATSBY_GOOGLE_API_KEY}`
  );

  // Events call
  const [shows, showsLoading] = useFetch(
    `https://graph.facebook.com/v12.0/me/events?fields=name,place,id,start_time&access_token=${process.env.GATSBY_FACEBOOK_ACCESS_TOKEN}`
  );

  const [products, productsLoading] = useFetch(
    `https://api.printful.com/store/products`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GATSBY_PRINTFUL_API_KEY}`,
      },
    }
  );

  const iterativeApiCall = async (id) => {
    return await fetch(`https://api.printful.com/store/products/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.GATSBY_PRINTFUL_API_KEY}`,
      },
    }).then((response) => response.json);
  };

  const aggregateResponses = async (products) => {
    return await Promise.all(
      await products.result
        .map((product) => product.id)
        .map(async (i) => {
          return { i, product: await iterativeApiCall(i) };
        })
    );
  };

  if (!productsLoading && products && !products.error) {
    const aggregatedProducts = aggregateResponses(products);
    console.log(aggregatedProducts);
  }

  let filteredEvents;
  if (!showsLoading && shows && !shows.error) {
    filteredEvents = shows.data.filter((event) => {
      return moment() < moment(event.start_time);
    });
  }

  const pages = [
    <Landing theme={theme} changePage={changePage} />,
    <About theme={theme} changePage={changePage} />,
    <Gallery
      theme={theme}
      changePage={changePage}
      media={gallery.data}
      loading={galleryLoading}
    />,
    <Stream
      theme={theme}
      changePage={changePage}
      video={video}
      loading={videoLoading}
    />,
    <Tour
      theme={theme}
      changePage={changePage}
      bg={bg}
      events={filteredEvents}
      loading={showsLoading}
    />,
    <Merch theme={theme} changePage={changePage} products={products} />,
  ];

  function changePage(index) {
    setPage(index);
  }
  return (
    <Layout theme={theme}>
      <GlobalStyle />

      <animated.div style={fade}>
        <Nav changePage={changePage} theme={theme} />
        <Container>{pages[pageIndex]}</Container>
      </animated.div>
    </Layout>
  );
};

export default HomePage;
