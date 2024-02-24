import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(`${config.backendEndpoint}/reservations/`); 
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

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length == 0){
    document.getElementById("no-reservation-banner").style.display='block';
    document.getElementById("reservation-table-parent").style.display='none';
  }else if(reservations.length>0){
    document.getElementById("no-reservation-banner").style.display='none';
    document.getElementById("reservation-table-parent").style.display='block';

    const table = document.getElementById("reservation-table");

    reservations.map((reservation)=>{
      var data = document.createElement('tr');
      // data.id=reservation.id;

      var date= new Date(reservation.date);
      var time = new Date(reservation.time);

      date = date.toLocaleDateString('en-IN',{
        // weekday: "long",np
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      time = time.toLocaleDateString("en-IN",{ 
        year:"numeric", 
        day:"numeric", 
        month:"long", 
        hour:"numeric", 
        minute:"numeric", 
        second:"numeric", 
        hour12:true, 
      }).replace(" at",",");
      
      data.innerHTML=`<td> ${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${date}</td>
      <td>${reservation.price}</td>
      <td>${time}</td>
      <td scope="col">
        <button id="${reservation.id}" class="reservation-visit-button">
          <a href="../detail/?adventure=${reservation.adventure}">Visit adventure</a>
        </button>
      </td>
      `
      table.appendChild(data);
    });


  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
