import React from 'react'
import SinglePageMap from '../components/SinglePageMap'

class SingleResult extends React.Component {
  state = { 
    site: { }, 
    loading: true, 
    geometry: {}
  }

  fetchSite = () => {
    const siteId = this.props.match.params.id;
    const siteUrl =`https://services.arcgis.com/8Pc9XBTAsYuxx9Ny/arcgis/rest/services/ContaminatedSite_gdb/FeatureServer/0/query?where=OBJECTID%20%3E%3D%20${siteId}%20AND%20OBJECTID%20%3C%3D%20${siteId}&outFields=*&outSR=4326&f=json`
    fetch(siteUrl)
    .then(response => response.json())
    .then((data) => this.setState({site: data.features[0].attributes, loading: false, geometry: data.features[0].geometry}))
    .then((data) => console.log(data))
    .catch(err => console.error(err))
  }

  componentDidMount() {
    this.fetchSite()
  }

  render( ){
    const {site} = this.state
    const permitLookup = {
      "UT" : "Storage Tanks",
      "IW5" : "Industrial Waste",
      "HWR" :	"Hazardous Waste Removal",
      "SW"	: "Solid Waste",
      "IW"	: "Industrial Waste",
      "AW"	: "Waste",
      "ARP"	: "Airports and Contracts"
    }

    if (this.state.loading) {
      return (<div>Loading...</div>)
    } 
    return (
    <div>
      <div style={{ position: 'relative', minHeight: '400px', backgroundColor: 'azure', marginTop: '64px' }}>
      {
        this.state.geometry.x &&
        <SinglePageMap
          site={this.state.site}
          geometry={this.state.geometry}
        />
      }
    </div>
      <div className="wrapper">
      <div className="single-image-wrapper">
      <iframe width="100%"
        title="google-streetview"
        height="100%"
        loading="lazy"
        frameBorder="0"
        streetview="true"
        src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.REACT_APP_GOOGLE_API_KEY}&location=${this.state.geometry.y},${this.state.geometry.x}&fov=90`}>
      </iframe>
        {/* <img className="single-image" src={`https://maps.googleapis.com/maps/api/streetview?size=800x800&location=${site.HNUM}+${site.ST_NAME}+${site.PRE_DIR}+${site.ST_TYPE}+MIAMI+FL&heading=271&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API_KEY}`} alt="contaminated site" /> */}
      </div>
      <div className="single-text-wrapper">
        <h1>{site.HNUM} {site.PRE_DIR} {site.ST_NAME} {site.ST_TYPE}</h1>
          <table>
            <tbody>
            <tr>
              <td>Address:</td>
              <td>{site.HNUM} {site.PRE_DIR} {site.ST_NAME} {site.ST_TYPE}</td>
            </tr>
            <tr>
              <td>Task Name:</td>
              <td>{site.TASK_NAME}</td>
            </tr>
            <tr>
              <td>Folio:</td>
              <td>{site.FOLIO}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{site.CLASSIFCTN}</td>
            </tr>
            <tr>
              <td>Type:</td>
              <td>{permitLookup[site.PERMITTYPE.split(' ').join('')]}</td>
            </tr>
            <tr>
              <td>Phase:</td>
              <td>{site.PHASEDESC}</td>
            </tr>
            <tr>
              <td>Permit No:</td>
              <td>{site.PERMITNO}</td>
            </tr>
            <tr>
              <td>File No:</td>
              <td>{site.FILENO}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


}
export default SingleResult