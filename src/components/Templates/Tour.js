import React from 'react';
import styled from 'styled-components';
import ShowList from '../Containers/ShowList';
import Map from '../Containers/Map';
import { useFetch } from '../Hooks/useFetch';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  .wrapper {
    box-sizing: border-box;
    min-height: 90vh;
    max-width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    align-items: center;
    justify-content: center;

    .tour {
      box-sizing: border-box;

      max-width: 100%;
      div {
        width: 100%;
        font-family: 'Quicksand';
        font-weight: 400;
        p {
          font-size: 1.3em;
          text-indent: 2em;
        }
      }
    }
    .map {
      max-width: 100%;
      box-sizing: border-box;
    }
  }

  @media all and (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0px;
    padding: 20px 5vw;
    .tour,
    .map {
      width: 100%;
      padding: 0;
    }
    .tour > div > p {
      font-size: 1em;
    }
  }
`;

const Tour = props => {
  const url = `https://rest.bandsintown.com/artists/Feeny/events?app_id=${
    process.env.GATSBY_BANDSINTOWN_API_KEY
  }&date=all`;
  const [data, loading] = useFetch(url);
  return (
    <Container id="tour" theme={props.theme} bg={props.bg}>
      <div className="wrapper">
        <div className="map">
          {loading ? 'Loading...' : <Map data={data} theme={props.theme} />}
        </div>
        <div className="tour">
          {loading ? (
            'Loading...'
          ) : (
            <ShowList data={data} theme={props.theme} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Tour;
