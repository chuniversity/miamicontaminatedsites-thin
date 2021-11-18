import React from 'react'
import Autocomplete from 'react-google-autocomplete';

const Home = props => {
	const goToSearchResultsForPlace = place => place.place_id && props.history.push(`/places/${place.place_id}`)
  
	return(
    <div className="v-header container">
    <div className="fullscreen-video-wrap">
      <video loop autoPlay muted>
      <source src="./video/bg2.mp4" type="video/mp4" />
    </video>
    </div>
    <div className="header-overlay">
      <div className="header-content">
        <div id="miami">
          <h1 className="title">Miami-Dade</h1>
          <h1 className="title">CONTAMINATED SITE SEARCH</h1>
          <p className="description">This tool allows Miami-Dade residents to view designated areas where environmental contamination has been documented in 
        the soil or groundwater. Updated monthly. 
          </p>
        </div>
        <div className="search-box">
          <div className="search-1"></div>
          <div className="search-2">
          <Autocomplete className="autocomplete"
          style={{
              width: '100%',
              height: '50px',
              borderTopWidth: 0,
              borderBottomWidth:0,
              paddingLeft: '15px',
              outline: 'none',
              borderRadius: 50,
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          onPlaceSelected={goToSearchResultsForPlace}
          types={['address']}
          componentRestrictions={{ country: 'us' }}
          />
          </div>
          <div className="search-3"></div>
        </div>
      </div>      
    </div>
   </div>

	)
}


export default Home