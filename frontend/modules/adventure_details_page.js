import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
      const params= new URLSearchParams(search);
      // console.log(params);
      const adventureId = params.get("adventure");
      // console.log(adventureId);

      return adventureId;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`) 
    const data = await res.json();
    console.log(data, typeof data);
    return data;
  } catch(err){
    console.log("Something went wrong!");
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
   console.log("DOM",adventure);
  var adventureName = document.getElementById('adventure-name');
  // console.log(adventureName);
  adventureName.innerHTML=adventure.name;


  var adSubtitle = document.getElementById('adventure-subtitle');

  adSubtitle.innerHTML = adventure.subtitle;


  var adPhotoGallery = document.getElementById('photo-gallery');
  
  var imagesArray =adventure.images;
  // console.log(imagesArray);

  for(var imageUrl of imagesArray){
    // console.log("hi", imageUrl);
      var div = document.createElement('div');
      
      div.innerHTML=`<img src=${imageUrl} class='activity-card-image'></img>`;

      adPhotoGallery.appendChild(div);
  }

  var adContent = document.getElementById('adventure-content');
  adContent.innerText = adventure.content;
}



//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log(images);
  var adPhotoGallery = document.getElementById('photo-gallery');

  adPhotoGallery.innerHTML=`<div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

  var carouselEle = document.getElementsByClassName('carousel-inner');
  console.log(carouselEle);

  images.map((image)=>{
    var ele = document.createElement('div');
    ele.className='carousel-item';
    ele.setAttribute('data-bs-intervl', '2000');

    ele.innerHTML=`<img src=${image} class="d-block w-100" alt="...">
    <div class="carousel-caption d-none d-md-block"`;

    console.log(image);

    carouselEle[0].appendChild(ele);
  })

  document.getElementsByClassName('carousel-item')[0].classList.add('active');


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";

    document.getElementById(
      "reservation-person-cost"
    ).textContent = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}


//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // console.log(adventure);
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    const bookingForm = document.querySelector("#myForm");
    // const submitBtn = document.querySelector("button[type='submit']");
    console.log(bookingForm.elements);

    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const {name, date, person} = bookingForm.elements;

      const formData = {
        name: name.value,
        person: person.value,
        date: date.value,
        adventure: adventure.id
      };

      console.log(formData);

      const response = await fetch(
        `${config.backendEndpoint}/reservations/new`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      );
      
      console.log(response);
      const json = await response.json();
      console.log(json);

      if(response.ok){
        window.alert("Success!");
        window.location.reload();
      }else{
        window.alert("Failed!");
      }

    });

    
    // console.log(name, date, person); 
     
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
    if(adventure.reserved === true){
      document.getElementById("reserved-banner").style.display='block';
    }else{
      document.getElementById("reserved-banner").style.display = "none";
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
