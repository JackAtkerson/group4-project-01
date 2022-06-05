var userFormEl = document.querySelector("#user-form");
var zipcodeInputEl = document.querySelector("#zipcode");
var breweriesContainer = document.querySelector("#breweries-container");
var mapContainerEl = document.querySelector("#map");
var showBreweries = document.querySelector("showbreweries");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var zipcode = zipcodeInputEl.value.trim();
  
    if (zipcode) {
      getBreweriesList(zipcode)
        breweriesContainer.textContent = "";
        zipcodeInputEl.value = "";
        mapContainerEl.textContent = "";
    } else {
      alert("Please enter a valid Zipcode");
    }
};

var Coordinates = [];

var getBreweriesList = function(breweries) {
  var apiUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + breweries; 
    fetch(apiUrl)
      .then(function(response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++){
              var longitude = data[i].longitude;
              var latitude = data[i].latitude; 
              var Passthrough = [longitude,latitude]; 
              Coordinates.push(Passthrough);
            }
            displayBreweries(data, breweries);
            //displayMap(data, breweries);
          });
        } else {
          alert('Error: Breweries Not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect to open brewery!");
      });

      console.log(apiUrl);
      //AddCircles();
};

var displayBreweries = function(breweries) {
  if (breweries.length === 0) {
    breweriesContainer.textContent = "No breweries found.";
    return;
  };

  var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        projection:"EPSG:4326",
        center: [breweries[0].longitude, breweries[0].latitude],
        zoom: 16,
        minzoom: 13,
        maxzoom: 20            
    })
  });
  
  for (var i = 0; i < breweries.length; i++) {
    
    var breweryName = breweries[i].name;
    var brewerySite = breweries[i].website_url;
    var breweryAddress = breweries[i].street;
    var breweryLongitude = breweries[i].longitude;
    var breweryLatitiude = breweries[i].latitude;

    console.log(breweryName);
    console.log(breweryLongitude);
    console.log(breweryLatitiude);
  
    var breweryEl = document.createElement("a");
      breweryEl.classList = "list-item flex-row justify-space-between align-center";
      breweryEl.setAttribute("href", brewerySite);
      breweryEl.setAttribute("target", "_blank");
    
    var titleEl = document.createElement("span");
      titleEl.textContent = breweryName;

    var breweryInfoEl = document.createElement("a");
      breweryInfoEl.setAttribute("href", brewerySite);
      breweryInfoEl.setAttribute("target", "_blank");
      breweryInfoEl.textContent = "";
      breweryInfoEl.setAttribute("class", "brewery-info btn button is-rounded is-responsive");

    var addressEl = document.createElement("p");
      addressEl.textContent = "Address: " + breweryAddress;

    breweryInfoEl.appendChild(titleEl);
    breweryInfoEl.appendChild(addressEl);
    breweriesContainer.appendChild(breweryInfoEl);

    var element = document.createElement('div');
      element.innerHTML = '<img src="https://cdn.mapmarker.io/api/v1/fa/stack?size=50&color=DC4C3F&icon=fa-microchip&hoffset=1" />';
    
    var marker = new ol.Overlay({
      position: [breweries[i].longitude, breweries[i].latitude],
      positioning: 'center-center',
      element: element,
      stopEvent: false
    });
    
    map.addOverlay(marker);
  };
}; 

userFormEl.addEventListener("submit", formSubmitHandler);

