import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  .product {
    box-sizing: border-box;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.black}dd;
    box-shadow: 5px 5px 5px 0px ${props => props.theme.white}88;
    border-radius: 20px;
    :hover {
      transition: 0.2s;
      box-shadow: 10px 10px 10px 0px ${props => props.theme.blue};
    }
    img {
      margin-bottom: 0.5rem;
      width: 100%;
      border-radius: 20px;
    }
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: ${props => props.theme.white};
      .name,
      .price {
        text-align: center;
        margin: 0 auto;
        padding: 0.5rem 0;
      }
      .name {
        font-size: 2rem;
      }
      .price {
        width: 80%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-size: 1.5rem;
        padding: 1rem 0;
      }
      button {
        background: transparent;
        color: ${props => props.theme.blue};
        border: 2px solid ${props => props.theme.blue};
        border-radius: 1rem;
        font-size: 1.5rem;

        padding: 1rem;
      }
    }
  }
  @media only screen and (max-width: 420px) {
    .product {
      padding: 0.5rem;
      .name,
      .price {
        font-size: 1.2rem;
      }
      .price {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
const Product = ({ product, theme }) => {
  return (
    <Container theme={theme}>
      <div className="product">
        <a href={product.url}>
          <img src={product.image} alt={product.name} />
          <p className="name">{product.name}</p>
          <div className="price">
            <p>{product.price}.00 </p>
            <button>Buy Now</button>
          </div>
        </a>
      </div>
    </Container>
  );
};

export default Product;
