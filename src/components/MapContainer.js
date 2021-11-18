import React from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
 
export class MapContainer extends React.Component {

  displayMarkers = () => {
    return this.props.sites
    .filter(site => {
      let cleaned = site.attributes.PERMITTYPE.split(' ').join(''); // fix spacing error in api
      if (this.props.permit === 'all') return true
        else return cleaned === this.props.permit
      })
    .map((site, index) => {
      return (
        <Marker  
          key={index} id={index} 
          position={{
            lat: site.geometry.y,
            lng: site.geometry.x
          }}
        />
      )
    })
  }
      render() {
        return (
          <Map
            google={this.props.google}
            style={{width: '100%', 
                    height: '400px'
                  }}
            initialCenter={{
              lat: this.props.place.geometry.location.lat(),
              lng: this.props.place.geometry.location.lng()
            }}
            zoom={this.props.zoom}
          >
          {this.displayMarkers()}
          </Map>
        );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)
