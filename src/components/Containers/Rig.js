import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;

  div {
    h3 {
      font-size: 1.7rem;

      width: 100%;
      text-align: center;
      color: ${props => props.theme.white};
    }
    ul {
      padding: 0;
      li {
        list-style: none;
        margin: 0 auto;
      }
    }
    p {
      font-weight: 600;
      color: ${props => props.theme.blue};
      font-size: 1.4rem;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 1rem;
      max-width: 960px;
    }
  }
  @media only screen and (max-width: 376px) {
    padding: 0;
    div {
      h3 {
        font-size: 1.2rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }
`;

const Rig = props => {
  return (
    <Container theme={props.theme}>
      <div
        dangerouslySetInnerHTML={{
          __html: props.data.rig.childMarkdownRemark.html,
        }}
      />
    </Container>
  );
};

export default Rig;
