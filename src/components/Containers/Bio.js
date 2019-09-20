import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 1rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: start;
  div {
    h3 {
      font-size: 1.7rem;
      width: 100%;
      text-align: center;
      color: ${props => props.theme.white};
    }
    p {
      width: 100%;
      text-align: center;
      max-width: 960px;
    }
  }
  @media only screen and (max-width: 420px) {
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

const Bio = props => {
  return (
    <Container theme={props.theme}>
      <div
        dangerouslySetInnerHTML={{
          __html: props.data.bio.childMarkdownRemark.html,
        }}
      />
    </Container>
  );
};

export default Bio;
