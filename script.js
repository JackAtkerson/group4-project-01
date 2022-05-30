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
        getBreweriesList(zipcode);
  
      // clear old content
      breweriesContainer.textContent = "";
      zipcodeInputEl.value = "";
    } else {
      alert("Please enter a valid Zipcode");
    }
};
  
var getBreweriesList = function(breweries) {
    
  var apiUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + breweries + "&perpage=5" ; 
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
};

var displayBreweries = function(breweries,) {
    
    if (breweries.length === 0) {
      repoContainerEl.textContent = "No breweries found.";
      return;
    }
    
    for (var i = 0; i < breweries.length; i++) {
      
      var breweryName = breweries[i].name;
      var brewerySite = breweries[i].website_url;
  
      
      var breweriesEl = document.createElement("a");
      breweriesEl.classList = "list-item flex-row justify-space-between align-center";
      breweriesEl.setAttribute("href", brewerySite);
      breweriesEl.setAttribute("target", "_blank");
  
      
      var titleEl = document.createElement("span");
      titleEl.textContent = breweryName;
  
      // append to container
      breweriesEl.appendChild(titleEl);
  
      // create a status element
      var statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";
  
      
      if (breweries[i] > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
  
      // append to container
      breweriesEl.appendChild(statusEl);
  
      // append container to the dom
      breweriesContainer.appendChild(breweriesEl);
    }
  };

userFormEl.addEventListener("submit", formSubmitHandler);
