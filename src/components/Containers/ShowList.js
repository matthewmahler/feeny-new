import React from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;

  font-size: 1.5rem;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  .grid {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media only screen and (max-width: 575px) {
    font-size: 1rem;
    .grid {
      box-sizing: border-box;
      width: 95%;
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1rem;
    }
  }
`;

const ShowList = (props) => {
  return (
    <Container theme={props.theme}>
      <div className="grid">
        {props.data.map((show, i) => {
          return <EventCard theme={props.theme} show={show} key={i} i={i} />;
        })}
      </div>
    </Container>
  );
};

export default ShowList;
