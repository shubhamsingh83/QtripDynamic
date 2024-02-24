import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(url) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  // const arr = url.split("=");
  const params = new URLSearchParams(url);
  console.log(url);
  const city = params.get("city");
  console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  //   const res = await fetch(`
  //   http://13.233.78.38:8082/adventures/?city=${city}
  //   `)
  //   const data = await res.json();
  //   console.log(data);
  //  return data;

  try {
    const res = await fetch(`
  ${config.backendEndpoint}/adventures?city=${city}
  `);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return null;
    console.log("something went wrong ak");
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  for (let i = 0; i < adventures.length; i++) {
    let contain = document.createElement("div");
    contain.className = "col-6 col-md-4 col-lg-3 mb-4";
    contain.innerHTML = ` <a href = "detail/?adventure=${adventures[i].id}" id = "${adventures[i].id}">
        <div class = " activity-card
        ">
        <img class= "img-responsive  " src=${adventures[i].image}></img>
        <p class = "category-banner">${adventures[i].category} </p>

        <div class style = "width:100%;" >
         <div class="d-flex justify-content-between"> 
          <h5>${adventures[i].name}</h5>
         <p>${adventures[i].costPerHead}</p> 
         </div>
         
         <div class="d-flex justify-content-between"> 
         <h5>Duration</h5>
          <p>${adventures[i].duration}</p>
         </div>

        </div>
        
        </div>
      </a>`;
    document.getElementById("data").appendChild(contain);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  //CRIO solution

  //   let filteredList = [];
  //   list.map((key) =>{
  //    if(key.duration > low && key.duration <= high){
  //     filteredList.push(key);
  //    }
  // });

  const filteredList = list.filter(
    (key) => key.duration > low && key.duration <= high
  );
  console.log(filteredList);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  // CRIO SOLUTION

  // let filteredList = [];
  // categoryList.forEach((category) => {
  //   list.forEach((key) => {
  //     if(key.category == category){
  //       filteredList.push(key);
  //     }
  //   });
  // });

  const filteredList = list.filter((adventure) =>
    categoryList.includes(adventure.category)
  );

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredList = [];
  console.log(filters["category"], "category");
  console.log(filters["duration"], "duration");
  // 1.Filter by Duration and category together
  if (filters["duration"] && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
    return filteredList;
  }

  //2.  Filter by duration only
  else if (filters["duration"]) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    return filteredList;
  }

  //Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
    return filteredList;
  } else {
    filteredList = list;
  }

  return list;

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;
  // Iterates over category filters and inserts categoy pill  to DOM
  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
               <div>${key} </div>
               `;

    document.getElementById("category-list").appendChild(ele);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
