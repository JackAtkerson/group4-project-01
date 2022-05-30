var userFormEl = document.querySelector("#user-form");
var zipInputEl = docunemt.querySelector("#zipcode");

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var zipcode = zipInputEl.value.trim();
    
    if(zipcode) {
        getNearbyBreweries(zipcode);
        zipInputEl.value = "";
        console.log("Hey you guys");
    } else {
        alert("Please enter a valid Zipcode");
    }
    
    console.log(event);
};

var getNearbyBreweries = function() {
    console.log("Testing tetsing, 1 2 3");
};

userFormEl.addEventListener("submit", formSubmitHandler);