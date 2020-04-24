import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import cheerio from 'cheerio';
import axios from 'axios';
import moment from 'moment';

import { useFetch } from '../components/Hooks/useFetch';
import '../fonts/fonts.css';
import Layout from '../components/Layout';
import Landing from '../components/Templates/Landing';
import About from '../components/Templates/About';
import Gallery from '../components/Templates/Gallery.js';
import Stream from '../components/Templates/Stream.js';
import Tour from '../components/Templates/Tour.js';
import Merch from '../components/Templates/Merch.js';
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
    width: 100vw;
    height: 100vh;
    ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
  
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
    `https://graph.facebook.com/v4.0/17841400290867787/media?fields=permalink%2Clike_count%2Ccaption%2Cmedia_type%2Cmedia_url&access_token=${process.env.GATSBY_FACEBOOK_ACCESS_TOKEN}`
  );
  // Youtube call
  const [video, videoLoading] = useFetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbVpSIpg8knuWNftRyXaSQQ&maxResults=1&order=date&type=video&key=${process.env.GATSBY_GOOGLE_API_KEY}`
  );

  // Events call
  const [shows, showsLoading] = useFetch(
    `https://graph.facebook.com/v4.0/me?fields=events%7Bname%2Cstart_time%2Cplace%2Cid%7D&access_token=${process.env.GATSBY_FACEBOOK_ACCESS_TOKEN}`
  );

  let filteredEvents;
  if (!showsLoading && shows && !shows.error) {
    filteredEvents = shows.events.data.filter((event) => {
      return moment() < moment(event.start_time);
    });
  }

  // Merch call
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const baseURL = 'https://feeny.bandcamp.com';
    var cors = 'https://cors-anywhere.herokuapp.com/';

    axios.get(cors + 'https://feeny.bandcamp.com/merch').then((response) => {
      const $ = cheerio.load(response.data);

      const urlElems = $('li.merch-grid-item');
      // We now loop through all the elements found
      for (let i = 0; i < urlElems.length; i++) {
        let product = {
          id: i,
          name: null,
          image: null,
          price: null,
          url: null,
        };
        const name = $(urlElems[i]).find('p.title');
        const image = $(urlElems[i]).find('img');
        const price = $(urlElems[i]).find('span.price');
        const url = $(urlElems[i]).find('a');

        if (name && image && price && url) {
          product.name = $(name).text().trim();

          product.image = $(image).attr('src');

          product.price = $(price).text().trim();
          product.url = baseURL + $(url).attr('href');
        }
        setProducts((oldArray) => [...oldArray, product]);

        if (i === urlElems.length - 1) {
          setProductsLoading(false);
        }
      }
    });
  }, []);

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
    <Merch
      theme={theme}
      changePage={changePage}
      products={products}
      loading={productsLoading}
    />,
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
