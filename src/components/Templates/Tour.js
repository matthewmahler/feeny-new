import React from 'react';
import styled from 'styled-components';
import ShowList from '../Containers/ShowList';
import Map from '../Containers/Map';
import { useFetch } from '../Hooks/useFetch';
import moment from 'moment';

const Container = styled.div`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  .wrapper {
    padding: 2rem;
    box-sizing: border-box;
    min-height: 90vh;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1rem;

    h1 {
      padding: 4rem;
      font-size: 2.5vw;
      border-radius: 1rem;
      color: ${props => props.theme.white};
      background-color: ${props => props.theme.black}ee;
      box-shadow: 5px 5px 5px 0px ${props => props.theme.grey};
    }
    .tour,
    .map {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      width: 100%;
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
      justify-content: center;
    }

    .tour,
    .map {
      margin: 2rem;
      width: 100%;
      padding: 0;
    }
    .tour > div > p {
      font-size: 1.5rem;
    }
  }
`;

const Tour = props => {
  const url = `https://graph.facebook.com/v4.0/me?fields=events%7Bname%2Cstart_time%2Cplace%2Cid%7D&access_token=${process.env.GATSBY_FACEBOOK_ACCESS_TOKEN}`;
  const [data, loading] = useFetch(url);
  console.log(data);

  let filtered;
  if (!loading && data && !data.error) {
    filtered = data.events.data.filter(event => {
      return moment() < moment(event.start_time);
    });
  }
  return (
    <Container id="tour" theme={props.theme} bg={props.bg}>
      <div className="wrapper">
        {data.error || (loading === false && filtered.length < 1) ? (
          <h1>More Shows TBA</h1>
        ) : (
          <>
            <div className="tour">
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <ShowList data={filtered} theme={props.theme} />
              )}
            </div>
            <div className="map">
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <Map data={filtered} theme={props.theme} />
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Tour;
