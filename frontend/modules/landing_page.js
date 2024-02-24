import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description


  let cities = await fetchCities();
console.log("8",cities)
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }

  console.log("From init()");
  console.log("http://3.110.175.53:8082/cities")
  console.log(cities);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  return await fetch(config.backendEndpoint + "/cities")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Handle successful response data
    console.log("34",data)
    return data;
  })
  .catch((error) => {
    // Handle errors, e.g., network or JSON parsing errors
    return null;
  });


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  console.log(city)

let contain  =  document.createElement("div");
contain.className = "col-6 col-md-4 col-lg-3 mb-4";
contain.innerHTML =
     ` <a href = "pages/adventures/?city=${id}" id = "${id}">
        <div class = "tile">
          <div class = "tile-text text-center">
          <h5>${city}</h5>
           <p>${description}</p>
          </div>
          <img class= "img-responsive" src=${image}></img>
        </div>
      </a>`
;
  document.getElementById("data").appendChild(contain); 
  
} 


// async function init() {
//   //Fetches list of all cities along with their images and description
//   let cities = await fetchCities();
//   console.log(cities);

//   //Updates the DOM with the cities
//   cities.forEach((key) => {
//     addCityToDOM(key.id, key.city, key.description, key.image);
//   });
// }



export { init, fetchCities, addCityToDOM };
