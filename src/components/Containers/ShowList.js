import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow-y: scroll;
  font-size: 1rem;
  ::-webkit-scrollbar { width: 0 !important }
  .parent {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;   
    a{
      text-decoration: none;
      color: ${props => props.theme.white};
      .grid {
      display: grid;
      grid-template-columns: 3fr 4fr 4fr 2fr;
      grid-gap: 5px;
      padding: 0 1vw;
      background-color: ${props => props.theme.black}99;
      border: 2px solid ${props => props.theme.blue};
      box-sizing: border-box;
      min-height: 5vh;
      transition: 0.2s ease-in-out;
      span{
          padding: 1rem 0;
          display: flex;
          align-items: center;
          width: 100%;
        }
        
      span.city{
          justify-content: center;
        }
      .link {
          text-align: center;
          justify-content: center;
          
          
        }
      }
    }
      .grid:hover{
        color: #fff;
        filter: saturate(8);
        box-shadow: 15px 15px 15px 5px rgba(0, 0, 0, 0.75);
        transition: 0.2s ease-in-out;
        .link {
          color: ${props => props.theme.red};
        }
      }
    }
  }
  @media only screen and (max-width: 575px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 375px) {
    .parent {
      a {
        .grid {
          .link {
            font-size: 0.8rem;
          }
        }
      }
    }
  }}
`;

const ShowList = props => {
  return (
    <Container theme={props.theme}>
      <div className="parent">
        {props.data.map((show, i) => {
          return (
            <a
              href={show.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="grid">
                <span className="date">
                  {moment(show.datetime).format('LL')}
                </span>
                <span className="venue">{show.venue.name}</span>
                <span className="city">
                  {show.venue.city}, {show.venue.region}
                </span>
                <span className="link">Tickets</span>
              </div>
            </a>
          );
        })}
      </div>
    </Container>
  );
};

export default ShowList;
