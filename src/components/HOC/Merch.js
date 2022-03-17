import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { BgImage } from 'gbimage-bridge';
import styled from 'styled-components';

import Product from '../Containers/Product';
import { useWindowSize } from '../Hooks/useWindowSize';

const Container = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  h1 {
    color: ${(props) => props.theme.black};
  }
  .wrapper {
    width: 80vw;
    max-width: 1140px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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

const Merch = (props) => {
  let [width, height] = useWindowSize();
  const data = useStaticQuery(query);
  const portrait = getImage(data.contentfulMerch.portraitBackgroundImage);
  const landscape = getImage(data.contentfulMerch.landscapeBackgroundImage);
  return (
    <BgImage
      Tag="section"
      image={height > width ? portrait : landscape}
      backgroundColor={props.theme.darkBlue}
      fadeIn={true}
    >
      <Container theme={props.theme}>
        <div className="wrapper">
          {data.allPrintfulProduct.edges.map((product, i) => {
            return (
              <Product
                key={i}
                product={product.node}
                theme={props.theme}
              ></Product>
            );
          })}
        </div>
      </Container>
    </BgImage>
  );
};

const query = graphql`
  query MerchQuery {
    contentfulMerch {
      title
      landscapeBackgroundImage {
        gatsbyImageData
      }
      portraitBackgroundImage {
        gatsbyImageData
      }
    }
    allPrintfulProduct {
      edges {
        node {
          name
          slug
          variants {
            name
            retail_price
          }
          productImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`;
export default Merch;
