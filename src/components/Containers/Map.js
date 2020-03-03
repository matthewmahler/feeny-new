import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `80vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={9} defaultCenter={{ lat: 40.492, lng: -74.901 }}>
    {props.isMarkerShown && props.data ? (
      props.data.map((marker, i) => {
        if (
          marker.place &&
          marker.place.location &&
          marker.place.location.latitude &&
          marker.place.location.longitude
        ) {
          return (
            <Marker
              key={i}
              position={{
                lat: marker.place.location.latitude,
                lng: marker.place.location.longitude,
              }}
              onClick={() =>
                window.open(
                  `https://www.facebook.com/events/${marker.id}`,
                  '_blank'
                )
              }
            />
          );
        }
      })
    ) : (
      <div />
    )}
  </GoogleMap>
));

class MapContainer extends Component {
  state = {
    isMarkerShown: false,
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        data={this.props.data}
      />
    );
  }
}
export default MapContainer;
