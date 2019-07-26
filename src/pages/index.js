import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSpring, animated } from 'react-spring';
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
    ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
  box-sizing: border-box;
  min-width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
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
`;

const Container = styled.div`
  min-width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: center;

  div {
    width: 100%;
  }
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  /* Optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
    background: #ff0000;
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

  const pages = [
    <Landing theme={theme} changePage={changePage} />,
    <About theme={theme} changePage={changePage} />,
    <Gallery theme={theme} changePage={changePage} />,
    <Stream theme={theme} changePage={changePage} />,
    <Tour theme={theme} changePage={changePage} bg={bg} />,
    <Merch theme={theme} changePage={changePage} />,
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
