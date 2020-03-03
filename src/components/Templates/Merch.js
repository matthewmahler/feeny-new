import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';

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
  let [width, height] = useWindowSize();

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
              {props.loading ? (
                <h1>Loading</h1>
              ) : (
                <div className="wrapper">
                  {props.products.map((product, i) => {
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
