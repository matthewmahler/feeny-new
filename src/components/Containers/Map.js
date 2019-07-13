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
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDnP_ODt-LxGUfCoo05ht0AbL2sx20XkA&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `80vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={7} defaultCenter={{ lat: 41.492, lng: -74.901 }}>
    {props.isMarkerShown && props.data ? (
      props.data.map((marker, i) => {
        return (
          <Marker
            key={i}
            position={{
              lat: parseInt(marker.venue.latitude),
              lng: parseInt(marker.venue.longitude),
            }}
            onClick={() => window.open(marker.url, '_blank')}
          />
        );
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
