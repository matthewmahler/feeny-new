import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.a`
  box-sizing: border-box;
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-gap: 0.5rem;
  background-color: ${(props) => props.theme.white.concat(props.opac)};
  color: ${(props) => props.theme.black};
  padding: 1.5rem;
  box-shadow: 5px 5px 5px 0px ${(props) => props.theme.black};
  min-height: 125px;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    .date,
    .day {
      display: block;

      display: flex;
      align-items: center;
      width: 100%;
    }
    .date {
      font-size: 1.5rem;
      font-weight: 900;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    .name {
      display: block;

      display: flex;
      align-items: center;
      width: 100%;
      color: ${(props) => props.theme.darkBlue};
      font-size: 1.5rem;
      font-weight: 900;
    }

    .time {
      font-size: 1rem;
      margin-right: 0.5rem;
    }
    .location {
      font-size: 1rem;
    }
    button {
      display: block;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 420px) {
    grid-template-columns: 1fr 4fr;
  }
`;

const EventCard = (props) => {
  const opac = (255 - props.i * 6).toString(16);
  return (
    <Container
      theme={props.theme}
      href={`https://www.facebook.com/events/${props.show.id}`}
      target="_blank"
      opac={opac}
    >
      <div>
        <span className="date">
          {moment(props.show.start_time).format('MMM D')}
        </span>
        <span className="day">
          {moment(props.show.start_time).format('ddd').toLocaleUpperCase()}
        </span>
      </div>
      <div className="info">
        <span className="name">{props.show.name}</span>
        <span className="time">
          {moment(props.show.start_time).format('h A')}{' '}
          {props.show.place && props.show.place.location ? (
            <span className="location">
              {props.show.place.location.city},{' '}
              {props.show.place.location.state}
            </span>
          ) : (
            <span className="location">TBA</span>
          )}
        </span>

        <button id={props.show.id}>✓ Going</button>
      </div>
    </Container>
  );
};

export default EventCard;
