//console.log('From the client side script');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form#submitForm')
const searchValue = document.querySelector('input#searchValue')
const searchResults1 = document.querySelector('p#searchResults1')
const searchResults2 = document.querySelector('p#searchResults2')
const searchResults3 = document.querySelector('p#searchResults3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchValue.value
    //console.log(location)
    searchResults1.textContent = "Loading..."
    searchResults2.textContent = ""
    searchResults3.textContent = ""
    fetch('weather?address='+location).then((response) => {
        
        response.json().then((data) => {
            if (data.error) {
                //console.log("Error: ", data.error)
                searchResults1.innerHTML = "Error: " + data.error
                //searchResults2.innerHTML = ""

            } else {
                // console.log(data)
                //const displayResults = "Location: " + data.location + "<br>Weather: " + data.weather
                searchResults1.innerHTML = "Location: " + data.location
                searchResults2.innerHTML = "Weather: " + data.weather
                searchResults3.innerHTML = "Air Quality: " + data.air_quality
                // console.log("Location: ", data.location)
                // console.log("Weather: ", data.weather)
            }
        })
    })
})


var favoriteLinks = document.getElementsByClassName("favLocationLink");

var parseAddress = function() {
    var selAddress = this.getAttribute("data-val");

    searchValue.value = selAddress;
    
    var event = new Event('submit');  // (*)
    weatherForm.dispatchEvent(event);
};

for (var i = 0; i < favoriteLinks.length; i++) {
    favoriteLinks[i].addEventListener('click', parseAddress, false);
}
