var userFormEl = document.querySelector("#user-form");
var zipcodeInputEl = document.querySelector("#zipcode");
var breweriesContainer = document.querySelector("#breweries-container");
var mapContainerEl = document.querySelector("#map-container");
var showBreweries = document.querySelector("showbreweries");


var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var zipcode = zipcodeInputEl.value.trim();
  
    if (zipcode) {
        getBreweriesList(zipcode);
  
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
    
    for (var i = 0; i < breweries.length; i++) {
      
        var breweryLongitude = breweries[i].longitude;
        var breweryLatitude = breweries[i].latitude;
        var breweryName = breweries[i].name;
        var brewerySite = breweries[i].website_url;
        var breweryAddress = breweries[i].street;

        var breweryEl = document.createElement("a");
        breweryEl.classList = "list-item flex-row justify-space-between align-center";
        breweryEl.setAttribute("href", brewerySite);
        breweryEl.setAttribute("target", "_blank");
      
        var titleEl = document.createElement("span");
        titleEl.textContent = breweryName;

        var breweryInfoEl = document.createElement("div");
        breweryInfoEl.setAttribute("class", "brewery-info");

        var addressEl = document.createElement("p");
        addressEl.textContent = "Address: " + breweryAddress;

        var map = new ol.Map({
            target: "map",
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([breweryLongitude, breweryLatitude]),
            })
        });

        breweryEl.appendChild(titleEl);
        breweryInfoEl.appendChild(breweryEl);
        breweryInfoEl.appendChild(addressEl);
        breweriesContainer.appendChild(breweryInfoEl);
    }
  };

userFormEl.addEventListener("submit", formSubmitHandler);
