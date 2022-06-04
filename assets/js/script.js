var userFormEl = document.querySelector("#user-form");
var zipcodeInputEl = document.querySelector("#zipcode");
var breweriesContainer = document.querySelector("#breweries-container");
var showBreweries = document.querySelector("showbreweries");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var zipcode = zipcodeInputEl.value.trim();
  
    if (zipcode) {
        getBreweriesList(zipcode)
  
      // clear old content
      breweriesContainer.textContent = "";
      zipcodeInputEl.value = "";
    } else {
      alert("Please enter a valid Zipcode");
    }
};
  
var getBreweriesList = function(breweries) {
    
  var apiUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + breweries; 
    fetch(apiUrl)
      .then(function(response) {
        
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            displayBreweries(data, breweries);
            displayMap(data, breweries);
          });
        } else {
          alert('Error: Breweries Not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect to open brewery!");
      });

      console.log(apiUrl);
};

var displayBreweries = function(breweries) {
    
    if (breweries.length === 0) {
      breweriesContainer.textContent = "No breweries found.";
      return;
    }

    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(0,0)
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([breweryLongitude, breweryLatitiude]),
        zoom: 16
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
    
        var centerLongitudeLatitude = ol.proj.fromLonLat([breweryLongitude, breweryLatitiude]);
        var layer = new ol.layer.Vector({
          source: new ol.source.Vector({
            projection: 'EPSG:4326',
            features: [new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, 50))]
          }),
          style: [
            new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'blue',
                width: 1
              }),
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)'
              })
            })
          ]
        });
    
        map.addLayer(layer);
    }

    

  };

var displayMap = function(breweries){
    console.log("map");
  };

userFormEl.addEventListener("submit", formSubmitHandler);

//* Start of Open Layers Java coding *//