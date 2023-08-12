function getDayFromDate(dateString) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

function getCurrentDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthName = months[monthIndex];

  return `${day} ${monthName} ${year}`;
}
const formattedDate = getCurrentDate();

// https://api.weatherapi.com/v1/current.json?key=ceed62929d1b4a5e8c2132203230608&q=London
let alltime = [];

function getWeatherDate(searchKey) {
  let getTime = new XMLHttpRequest();

  getTime.open(
    "get",
    `https://api.weatherapi.com/v1/forecast.json?key=ceed62929d1b4a5e8c2132203230608&q=${searchKey}&days=3`
  );
  getTime.send();
  getTime.addEventListener("loadend", function () {
    if (getTime.status == 200) {
      alltime = JSON.parse(getTime.response);
      displayAll();
    }
  });
}

getWeatherDate("cairo");

function displayAll() {
  let cartona = "";
  cartona += `   <div class="col-md-4 ">
      <div class="card text-bg-info mb-3 "
                            style=" background-color: #1e202b !important;">
                            <div class="card-header third-header d-flex justify-content-between  m-0">
                                <span>${getDayFromDate(
                                  alltime.forecast.forecastday[0].date
                                )}</span>
                                <span>${formattedDate}</span>
                            </div>
                            <div class="card-body third-color">
                                <p>${alltime.location.name}</p>
                            <div class="d-flex justify-content-between align-items-center">

                                <h2>${
                                  alltime.forecast.forecastday[0].day.avgtemp_c
                                }<sup>o</sup>C</h2>
                                <img src="https:${
                                  alltime.forecast.forecastday[0].day.condition
                                    .icon
                                }" alt="" width="90">
                                </div>
                                <p class="second-color">${
                                  alltime.forecast.forecastday[0].day.condition
                                    .text
                                }</p>
                                <div class="d-flex justify-content-between">
                                    <span><img src="./images/icon-umberella.png" alt=""> 20%</span>
                                    <span><img src="./images/icon-wind.png" alt=""> 18m/h</span>
                                    <span><img src="./images/icon-compass.png" alt=""> East</span>
                                </div>
                            </div>
                        </div></div>  `;
  for (let i = 1; i < alltime.forecast.forecastday.length; i++) {
    cartona += `      <div class="col-md-4 ">
        <div class="card text-bg-info mb-3 " style=" background-color: #1e202b !important;">
            <div class="card-header first-header text-center  m-0">${getDayFromDate(
              alltime.forecast.forecastday[i].date
            )}</div>
            <div class="card-body text-center ${
              i == 2 ? "third-color" : "first-color"
            } ">
      <img src="https:${
        alltime.forecast.forecastday[i].day.condition.icon
      }" alt="" width="48">
                <h2>${
                  alltime.forecast.forecastday[i].day.maxtemp_c
                }<sup>o</sup>C</h2>
                <small>${alltime.forecast.forecastday[i].day.mintemp_c}</small>
                <p class="text-center second-color pt-2">${
                  alltime.forecast.forecastday[i].day.condition.text
                }</p>
            </div>
            </div>
        </div> `;
  }
  document.querySelector(".row").innerHTML = cartona;
}
