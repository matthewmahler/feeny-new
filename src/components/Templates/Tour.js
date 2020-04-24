import React from 'react';
import styled from 'styled-components';
import ShowList from '../Containers/ShowList';
import Map from '../Containers/Map';

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  .wrapper {
    margin-top: 2rem;
    box-sizing: border-box;
    min-height: 90vh;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1rem;
    .tba {
      grid-column: 2 / span 3;
      width: 50%;
      h1 {
        width: auto;
        height: auto;
        padding: 4rem;
        font-size: 2.5vw;
        border-radius: 1rem;
        color: ${(props) => props.theme.white};
        background-color: ${(props) => props.theme.black}ee;
        box-shadow: 5px 5px 5px 0px ${(props) => props.theme.grey};
        text-align: center;
      }
    }

    .tour,
    .map {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      width: 100%;
      height: 80vh;
      overflow-y: scroll;
    }
  }
  @media only screen and (max-width: 769px) {
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 420px) {
    .wrapper {
      padding: 0;
    }
    .map {
      display: none;
    }
  }

  @media all and (max-width: 1500px) {
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .tour,
    .map {
      width: 100%;
      padding: 0;
    }
    .tour > div > p {
      font-size: 1.5rem;
    }
  }
`;

const Tour = (props) => {
  return (
    <Container id="tour" theme={props.theme} bg={props.bg}>
      <div className="wrapper">
        {props.events.error ||
        (props.loading === false && props.events.length < 1) ? (
          <div className="tba">
            <h1>More Shows TBA</h1>
          </div>
        ) : (
          <>
            <div className="tour">
              {props.loading ? (
                <h1>Loading...</h1>
              ) : (
                <ShowList data={props.events.reverse()} theme={props.theme} />
              )}
            </div>
            <div className="map">
              {props.loading ? (
                <h1>Loading...</h1>
              ) : (
                <Map data={props.events} theme={props.theme} />
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Tour;
