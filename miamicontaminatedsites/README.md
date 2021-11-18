# Miami Contaminated Sites

## Overview <a name="overview"></a>

This tool allows Miami-Dade residents to view designated areas where environmental contamination has been documented in the soil or groundwater.

This started has a demo of using the Google Places API to retrieve a latitude and longitude for a user-inputted address, and developed into a demonstration of using Front-End Engineering to solve common problems for regular people. Residents of the City of Miami can use this tool to make better informed decisions on matters of housing and purchasing property. 

## Demo <a name="demo"></a>

See <a href="http://www.miamicontaminatedsites.com/">Miami Contaminated Sites</a>

## Technology <a name="technology"></a>

The site uses a React Front End and a simple Node server that queries the <a href="https://gis-mdc.opendata.arcgis.com/datasets/MDC::contaminated-sites/about">Miami Open Data Hub Site</a>.

On the homepage the user is prompted to enter an address, while the form connects to the Google Autocomplete Api.  The user cannot submit the form unless selecting one of the Autocomplete selections, providing the app with a "place" to push to the searchResults page. 

On the searchResults page, the app then retrieves the latitude and longitude of that place, and calculates the maximum and minimum latitudes and longitudes around that place to establish the radius that we want to query. This is sent to the server via an API which will query the Miami Open Data Hub Site and return the result: the contaminated sites that are found in that radius. 

The app then provides a map containing markers for all of the queried sites, and a google StreetView images for the corresponding sites. Each site is clickable to have a detail singleResult page for that site. 



## Directions
Clone the repo
```
git clone https://github.com/chuniversity/miamicontaminatedsites.git
```

create the .env file in the root of the application and add the following linel:
REACT_APP_GOOGLE_API_KEY=[Your API Key Here]

run: `yarn upgrade`
run: `yarn start`

open a new terminal, cd into /client  <br />
run `yarn upgrade`
run `yarn start`
