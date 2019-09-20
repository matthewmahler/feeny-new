import React from 'react';
import styled from 'styled-components';
// import { useFetch } from '../Hooks/useFetch';

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  h1 {
    color: ${props => props.theme.black};
  }
`;

const Tour = props => {
  // const url = '';
  // const [data, loading] = useFetch(url);
  // console.log(data);
  return (
    <Container theme={props.theme}>
      <h1>Coming Soon</h1>
    </Container>
  );
};

export default Tour;
