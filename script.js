var userFormEl = document.querySelector("#user-form");
var zipcodeinputEl = document.querySelector("#Zipcode");
var breweraiescontainer = document.querySelector("#breweries-container");
var showbreweries = document.querySelector("showbreweries");


var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var zipcode = zipcodeinputEl.value.trim();
  
    if (zipcode) {
        getbrewarieslist(zipcode);
  
      // clear old content
      breweraiescontainer.textContent = "";
      zipcodeinputEl.value = "";
    } else {
      alert("Please enter a valid Zipcode");
    }
};
  
var getbrewarieslist = function(breweries) {
    // format the github api url
  var apiUrl = "https://api.openbrewerydb.org/breweries?by_postal=&per_page=3"+ breweries +"/postal" ; 
  
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            displaybrewaries(data, breweries);
          });
        } else {
          alert('Error: Breweries Not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect to open brewary!");
      });
};

var displaybrewaries = function(breweries,) {
    // check if api returned any repos
    if (breweries.length === 0) {
      repoContainerEl.textContent = "No breweries found.";
      return;
    }
  
    //showbreweries.textContent = zipcode;
  
    // loop over repos
    for (var i = 0; i < breweries.length; i++) {
      // format repo name
      var breweriesName = breweries[i].name;
  
      // create a link for each repo
      var breweriesEl = document.createElement("a");
      breweriesEl.classList = "list-item flex-row justify-space-between align-center";
      breweriesEl.setAttribute("href", "https://api.openbrewerydb.org/breweries" + breweriesName);
  
      // create a span element to hold repository name
      var titleEl = document.createElement("span");
      titleEl.textContent = breweriesName;
  
      // append to container
      breweriesEl.appendChild(titleEl);
  
      // create a status element
      var statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";
  
      // check if current repo has issues or not
      if (breweries[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
  
      // append to container
      breweriesEl.appendChild(statusEl);
  
      // append container to the dom
      breweraiescontainer.appendChild(breweriesEl);
    }
  };
userFormEl.addEventListener("submit", formSubmitHandler);