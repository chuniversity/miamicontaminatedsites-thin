import React from 'react'
import axios from 'axios'
import Result from '../components/Result'
import MapContainer from '../components/MapContainer'
class SearchResults extends React.Component {
  state = {
            place: { formatted_address: "Loading..." },
            radiusMiles: 1,
            sites: [],
            totalResults: 0,
            permit: 'all',
            permitText: 'All',
            filteredResults: 0,
            mapPoints: [],
            zoom: 15,
            loading: true,
          }

  handlePermitChange = event => this.setState({
    permit: event.target.value,
    permitText: event.target.options[event.target.selectedIndex].text
  })

  handleRadiusChange = event => this.setState({ radiusMiles: Number(event.target.value) }, () => this.fetchSites(this.state.place))

  fetchSites = (place) => {
    const { radiusMiles } = this.state;
    if (!place || !place.geometry) return;
    const [lat, lng] = [place.geometry.location.lat(), place.geometry.location.lng()];
    const radiusDegrees = (radiusMiles/138)
    const minLongitude = lng - radiusDegrees
    const maxLongitude = lng + radiusDegrees
    const minLatitude = lat - radiusDegrees
    const maxLatitude = lat + radiusDegrees
    const url = `https://services.arcgis.com/8Pc9XBTAsYuxx9Ny/arcgis/rest/services/ContaminatedSite_gdb/FeatureServer/0/query?where=1%3D1&outFields=*&geometry=${minLongitude}%2C${minLatitude}%2C${maxLongitude}%2C${maxLatitude}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json`
    axios.get(url)
    .then(response => {
      const { data } = response;
      const { features } = data;
      console.log('pass fetchsites')
      this.setState({ loading: false, sites: features, totalResults: features.length, place })
    })
  }

  componentDidMount(){
    console.log('pass componentdidmount')
    const service = new window.google.maps.places.PlacesService(document.getElementById('map'))
    service.getDetails({ placeId: this.props.match.params.placeId }, (place) => this.fetchSites(place))
  }

  render(){

    return(
      <>
        <div style={{position: 'relative', minHeight: '400px', backgroundColor: 'azure', marginTop: '64px'}}>
        {
          this.state.place.geometry &&
          <MapContainer
            place={this.state.place}
            sites={this.state.sites}
            permit={this.state.permit}
            zoom={this.state.zoom}
          />
        }
        </div>
          <Result 
            {...this.state} 
            placeId={this.props.match.params.placeId}
            handlePermitChange={this.handlePermitChange}
            handleRadiusChange={this.handleRadiusChange}
          />
        <div id="map"></div>
      </>
    )
  }
}
export default SearchResults