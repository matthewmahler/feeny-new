import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';
import cheerio from 'cheerio';
import axios from 'axios';
import Product from '../Containers/Product';
import { useWindowSize } from '../Hooks/useWindowSize';

const Container = styled.div`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  h1 {
    color: ${props => props.theme.black};
  }
  .wrapper {
    width: 80vw;
    max-width: 960px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 420px) {
    .wrapper {
      margin: 1rem;
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;
      justify-content: center;
      grid-gap: 1rem;
    }
  }
`;

const Merch = props => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  let [width, height] = useWindowSize();

  useEffect(() => {
    const baseURL = 'https://feeny.bandcamp.com';
    axios.get('https://feeny.bandcamp.com/merch').then(response => {
      const $ = cheerio.load(response.data);

      const urlElems = $('li.merch-grid-item');
      console.log(urlElems);
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
          product.name = $(name)
            .text()
            .trim();

          product.image = $(image).attr('src');

          product.price = $(price)
            .text()
            .trim();
          product.url = baseURL + $(url).attr('href');
        }
        console.log(product);
        setProducts(oldArray => [...oldArray, product]);

        if (i === urlElems.length - 1) {
          setLoading(false);
        }
      }
    });
  }, []);
  return (
    <StaticQuery
      query={graphql`
        query MerchQuery {
          contentfulMerch {
            title
            landscapeBackgroundImage {
              fluid {
                aspectRatio
                base64
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
                tracedSVG
              }
            }
            portraitBackgroundImage {
              fluid {
                aspectRatio
                base64
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
                tracedSVG
              }
            }
          }
        }
      `}
      render={data => {
        const portrait = data.contentfulMerch.portraitBackgroundImage.fluid;
        const landscape = data.contentfulMerch.landscapeBackgroundImage.fluid;
        return (
          <BackgroundImage
            Tag="section"
            fluid={height > width ? portrait : landscape}
            backgroundColor={props.theme.darkBlue}
            fadeIn={true}
          >
            <Container theme={props.theme}>
              {loading ? (
                <h1>Loading</h1>
              ) : (
                <div className="wrapper">
                  {products.map((product, i) => {
                    return (
                      <Product product={product} key={i} theme={props.theme} />
                    );
                  })}
                </div>
              )}
            </Container>
          </BackgroundImage>
        );
      }}
    />
  );
};

export default Merch;
