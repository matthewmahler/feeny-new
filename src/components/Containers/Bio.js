import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Container = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  h2 {
    font-size: 3em;
    color: ${props => props.theme.white};
    border-bottom: 3px solid ${props => props.theme.blue};
    text-align: center;
    margin: 0 auto;
  }
  h3 {
    text-align: center;

    color: ${props => props.theme.lightBlue};
  }
  .text {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    p {
      width: 80%;
      margin: 1em auto;
      max-width: 960px;
      color: ${props => props.theme.lightBlue};
    }
  }
`;

const Bio = props => {
  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });
  return (
    <animated.div style={mainFade}>
      <Container theme={props.theme}>
        <h2>{props.data.name} </h2>
        <h3>{props.data.position}</h3>
        <div
          className="text"
          dangerouslySetInnerHTML={{
            __html: props.data.bio.childMarkdownRemark.html,
          }}
        />
      </Container>
    </animated.div>
  );
};

export default Bio;
