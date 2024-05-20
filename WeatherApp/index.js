console.log("To chaliye shuru karte hai...");

let getElementById = (id) => {
  return document.getElementById(id);
};
let toggleBtn = getElementById("toggle");

let menu = document.getElementById("menu");
let checkWeather = menu.children[0];
let alerts = menu.children[1];
let news = menu.children[2];
let faq = menu.children[3];

let locationText = document.getElementById("location-access-text");
let locationBtn = getElementById("location-access-btn");

let sunriseText = document.getElementById("sunrise-moonrise");
let sunriseTime = document.getElementById("sunrise-moonrise-time");
let sunsetText = document.getElementById("sunset-moonset");
let sunsetTime = document.getElementById("sunset-moonset-time");
let sunImg = document.getElementById("circle");
let lineImg = document.getElementById("line");

let weatherContainer =
  document.body.getElementsByClassName("weather-report")[0];
let searchInput = getElementById("search-input");
let searchBtn = getElementById("search-btn");

let wPlace = getElementById("weather-place");
let wIcon = getElementById("weather-icon");
let wTemp = getElementById("weather-temp");
let wFeels = getElementById("weather-feels-like");
let wRChance = getElementById("weather-rain-chance");
let wHumidity = getElementById("weather-humidity");
let wDesc = getElementById("weather-description");

let wDir = getElementById("wind-direction");
let wSpeed = getElementById("wind-speed");
let wPres = getElementById("wind-pressure");
let wPrec = getElementById("wind-prescipitation");
let wHeat = getElementById("wind-heat-index");

let no2 = getElementById("o2");
let co = getElementById("co");
let o3 = getElementById("o3");
let so2 = getElementById("so2");

let newNewsBtn = getElementById("new-news");
let nHeadline = getElementById("news-headline");
let nSource = getElementById("news-source");
let nImg = getElementById("news-image");
let nAuthor = getElementById("news-author");
let nDesc = getElementById("news-description");
let nContent = getElementById("news-content");
let nPublish = getElementById("news-publish-at");
let nKnowMore = getElementById("news-know-more");

// fetchNewsData("weather");

newNewsBtn.addEventListener("click", (e) => {
  
  fetchNewsData("weather");
});

locationBtn.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        locationText.innerText = "Location acess permission given";
        locationBtn.disabled = true;
        fetchWeatherData(null, latitude, longitude);
      },
      function (error) {
        console.error("Error getting geolocation:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
});


//Forecast Card Section
function createForecastCard(
  forecast_time,
  forecast_icon,
  forecast_temp,
  forecast_rain
) {
  // Get the template element
  let template = document.getElementById("cards");

  // Clone the template content
  let clone = document.importNode(template.content, true);
  
  // Modify the dynamic values
  clone.querySelector("#forecast-time").textContent = forecast_time;
  clone.querySelector("#forecast-icon").src = forecast_icon;
  clone.querySelector(
    "#forecast-temp"
  ).textContent = `Temp: ${forecast_temp}° C`;
  clone.querySelector(
    "#forecast-rain-chance"
  ).textContent = `Rain: ${forecast_rain}%`;

  document.body.getElementsByClassName("cards-container")[0].appendChild(clone);
}

//Alert Section
function createAlerts(
  alert_headline,
  alert_severity,
  alert_areas,
  aleart_desc,
  alert_instruction
) {
  // Get the template element
  let template = document.getElementById("alerts-container");

  // Clone the template content
  let clone = document.importNode(template.content, true);
  
  // Modify the dynamic values
  clone.querySelector("#alert-headline").textContent = alert_headline;
  clone.querySelector(
    "#alert-severity"
  ).textContent = `Severity: ${alert_severity}`;
  clone.querySelector("#alert-areas").textContent = `Areas: ${alert_areas}`;
  clone.querySelector(
    "#alert-description"
  ).textContent = `Description: ${aleart_desc}`;
  clone.querySelector(
    "#alert-instruction"
  ).textContent = `Instruction: ${alert_instruction}`;

  // Append the modified clone to the body or another container
  document.body
    .getElementsByClassName("alerts-container-main")[0]
    .appendChild(clone);
}
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the button and the container
  let btn = document.getElementById("aleart-headline-btn");
  let container = document.getElementById("alert-content-container");

  // Add event listener for mouseover to show the container
  btn.addEventListener("mouseover", function () {
    container.style.display = "flex";
  });

  // Add event listener for mouseout to hide the container
  btn.addEventListener("mouseout", function () {
    container.style.display = "none";
  });
});

let hem_btn = document.getElementById("toggle");

document.addEventListener("DOMContentLoaded", function () {
  let faqBoxes = document.body.getElementsByClassName("faq-box");

  // Iterate over each faq-box element
  for (let i = 0; i < faqBoxes.length; i++) {
    let btn = faqBoxes[i]
      .getElementsByClassName("question")[0]
      .querySelector("img");
    let container = faqBoxes[i].getElementsByClassName("answer")[0];

    // Add event listener for mouseover to show the container
    btn.addEventListener("click", function () {
      if (container.style.display == "flex") {
        container.style.display = "none";
        btn.setAttribute("src", "assets/images/add-icon.svg");
      } else {
        container.style.display = "flex";
        btn.setAttribute("src", "assets/images/cross-icon.svg");
      }
    });
  }

  // Get all navbar links
  let navLinks = document.querySelectorAll(".nav-link");

  // Add click event listener to each navbar link
  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Get the target section's ID from the href attribute
      let targetId = navLink.getAttribute("href");

      // Get the target section element
      let targetSection = document.querySelector(targetId);

      // Scroll to the target section
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});
function toggleMenu() {
  let menuOverlay = document.getElementById("menu-overlay");

  // Toggle the display of the menu overlay
  if (menuOverlay.style.display === "block") {
    menuOverlay.style.display = "none";
    hem_btn.setAttribute("src", "assets/images/hem-icon.svg");
  } else {
    // Create and populate the transparent box with navigation items
    let navItems = document.getElementById("menu").innerHTML;
    console.log(navItems);
    menuOverlay.innerHTML = "<ul>" + navItems + "</ul>";
    menuOverlay.style.display = "block";
    console.log(menuOverlay);
    hem_btn.setAttribute("src", "assets/images/cross-icon.svg");
  }
}
hem_btn.addEventListener("click", () => {
  toggleMenu();
});

function fetchNewsData(contentType) {
  const apiKey = "e1edb9c8b1674abbbc05d416e30566ad";
 
  let apiUrl;
  apiUrl = `https://newsapi.org/v2/everything?q=${contentType}&from=2024-04-13&sortBy=popularity&apiKey=${apiKey}`;

  // Make an HTTP GET request to the API endpoint
  fetch(apiUrl)
    .then((response) => {
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      setNewsContent(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch operation
      console.error("There was a problem with the fetch operation:", error);
    });
}

function setNewsContent(data) {
  document.getElementById("news-container-main").innerHTML = "";
  let articles = data.articles;
  for (let i = 0; i < 10; i++) {
    let dHeadline = articles[i].title;
    let dSource = articles[i].source.name;
    let dImg = articles[i].urlToImage;
    let dAuthor = articles[i].author;
    let dDesc = articles[i].description;
    let dContent = articles[i].content;
    let dPublish = articles[i].publishedAt;
    let dUrl = articles[i].url;
    createNewsCards(
      dHeadline,
      dSource,
      dImg,
      dAuthor,
      dDesc,
      dContent,
      dPublish,
      dUrl
    );
  }
}
function createNewsCards(
  headline,
  source,
  img,
  author,
  desc,
  content,
  publish,
  url
) {
  // Get the template element
  let template = document.getElementById("news-container");

  // Clone the template content
  let clone = document.importNode(template.content, true);
  

  // Modify the dynamic values
  clone.querySelector("#news-headline").textContent = headline;
  clone.querySelector("#source").textContent = `From ${source}`;
  clone.querySelector("#news-image").setAttribute("src", img);
  clone.querySelector("#news-author").textContent = `Author: ${author}`;
  clone.querySelector("#news-description").textContent = `Description: ${desc}`;
  clone.querySelector("#news-content").textContent = content;
  clone.querySelector(
    "#news-publish-at"
  ).textContent = `Published at ${publish}`;
  clone.querySelector("#news-know-more").addEventListener("click", (e) => {
    window.location.href = url;
  });

  // Append the modified clone to the body or another container
  document.body
    .getElementsByClassName("news-container-main")[0]
    .appendChild(clone);
}

function fetchWeatherData(city, latitude, longitude) {
  const apiKey = "d4c463e6039f4e2aa5f61942241205";
  
  let apiUrl;
  if (latitude == null && longitude == null) {
    apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=yes `;
  } else {
    apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=yes`;
  }

  // Make an HTTP GET request to the API endpoint
  fetch(apiUrl)
    .then((response) => {
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      setContent(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch operation
      console.error("There was a problem with the fetch operation:", error);
    });
}
var currentTimeMillis;
function setContent(jsonData) {
  let dplace = jsonData.location.name;

  let dicon = jsonData.current.condition.icon;
  let dtemp = jsonData.current.temp_c;
  let dfeels_temp = jsonData.current.feelslike_c;
  let dhumidity = jsonData.current.humidity;
  let ddesc = jsonData.current.condition.text;
  let drain = jsonData.forecast.forecastday[0].day.daily_chance_of_rain;

  let dwindDir = jsonData.current.wind_dir;
  let dwindSp = jsonData.current.wind_kph;
  let dwindPrec = jsonData.current.precip_mm;
  let dwindVis = jsonData.current.vis_km;
  let dwindPres = jsonData.current.pressure_mb;

  let dco = jsonData.current.air_quality.co;
  let dso2 = jsonData.current.air_quality.so2;
  let dno2 = jsonData.current.air_quality.no2;
  let do3 = jsonData.current.air_quality.o3;

  wPlace.innerText = dplace;
  wIcon.setAttribute("src", dicon);
  wTemp.innerText = `${dtemp}° C`;
  wFeels.innerText = `Feels like ${dfeels_temp}° C`;
  wRChance.innerText = `Chance of rain: ${drain}%`;
  wHumidity.innerText = `Humidity: ${dhumidity}`;
  wDesc.innerText = `Description: ${ddesc}`;

  wDir.innerText = `Direction: ${dwindDir}`;
  wSpeed.innerText = `Wind Speed: ${dwindSp}km/hr`;
  wPrec.innerText = `Precipitation: ${dwindPrec}mm`;
  wPres.innerText = `Pressure: ${dwindPres}mb`;
  wHeat.innerText = `Viscosity: ${dwindVis}km`;

  no2.innerText = `NO2 Index: ${dno2}`;
  so2.innerText = `SO2 Index: ${dso2}`;
  co.innerText = `CO Index: ${dco}`;
  o3.innerText = `O3 Index: ${do3}`;

  let forecastData = jsonData.forecast;
  setForecastDetails(forecastData);
  let currentTime = jsonData.location.localtime;
  currentTimeMillis = findCurrentTime(currentTime);
  setSunContainer(forecastData);
  let alertsData = jsonData.alerts;
  setAlertsData(alertsData);
}

function findCurrentTime(localtimeString) {
  // Split the string by space to separate date and time segments
  let segments = localtimeString.split(" ");
  let currentTimeMil;
  // Extract the time segment
  let timeSegment = segments[1]; // "6:20"

  // Split the time segment by ":" to get hours and minutes separately
  let timeParts = timeSegment.split(":");

  // Create a new Date object with the current date and extracted time
  let currentTime = new Date();
  currentTime.setHours(parseInt(timeParts[0])); // Set hours
  currentTime.setMinutes(parseInt(timeParts[1])); // Set minutes
  currentTimeMil = currentTime.getTime();
  
  return currentTimeMil;
}
let sunriseMillis, sunsetMillis;
function setSunContainer(data) {
  let sunrise = data.forecastday[0].astro.sunrise;
  let sunset = data.forecastday[0].astro.sunset;
  let moonrise = data.forecastday[0].astro.moonrise;
  let moonset = data.forecastday[0].astro.moonset;
  sunriseMillis = convertAstroTimeInMillis(sunrise);
  sunsetMillis = convertAstroTimeInMillis(sunset);
  let moonriseMillis = convertAstroTimeInMillis(moonrise);
  let moonsetMillis = convertAstroTimeInMillis(moonset);

  let sunTimeGap = sunsetMillis - sunriseMillis;
  let moonTimeGap = -sunriseMillis - sunsetMillis;
  
  let midNightMillis = findCurrentTime("12-05-2024 00:00");
  if (currentTimeMillis >= sunriseMillis && currentTimeMillis <= sunsetMillis) {
    sunImg.setAttribute("src", "assets/images/circle.png");
    sunriseText.innerText = "Sunrise";
    sunriseTime.innerText = sunrise;
    sunsetText.innerText = "Sunset";
    sunsetTime.innerText = sunset;
    setSunImage(sunTimeGap, null);
  } else if (
    (currentTimeMillis > sunsetMillis && currentTimeMillis < midNightMillis) ||
    (currentTimeMillis >= midNightMillis && currentTimeMillis < sunriseMillis)
  ) {
    sunImg.setAttribute("src", "assets/images/moon.png");
    sunriseText.innerText = "Moonrise";
    sunriseTime.innerText = moonrise;
    sunsetText.innerText = "Moonset";
    sunsetTime.innerText = moonset;
    setSunImage(null, moonTimeGap);
  } else {
  }
}
function setSunImage(sgap, mgap) {
  let elapsedTime;
  let totalDuration;
  if (mgap == null) {
    elapsedTime = currentTimeMillis - sunriseMillis;
    totalDuration = sgap;
  } else {
    elapsedTime = currentTimeMillis - sunsetMillis;
    totalDuration = mgap;
  }

  // Calculate the percentage of elapsed time relative to total duration
  let percentage = (elapsedTime / totalDuration) * 100;

  sunImg.style.left = percentage + "%";
  
}
function convertAstroTimeInMillis(localtimeString) {
  // Split the string by space to separate date and time segments
  let segments = localtimeString.split(" ");

  // Extract the time segment
  let timeSegment = segments[0]; // "6:20"
  let period = segments[1]; // "AM"

  // Split the time segment by ":" to get hours and minutes separately
  let timeParts = timeSegment.split(":");

  // Extract hours and minutes
  let hours = parseInt(timeParts[0]);
  let minutes = parseInt(timeParts[1]);

  // Convert 12-hour time to 24-hour time if necessary
  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  // Create a new Date object with the current date and extracted time
  let currentTime = new Date();
  currentTime.setHours(hours); // Set hours
  currentTime.setMinutes(minutes); // Set minutes

  // Convert time to milliseconds
  let astroTimeMillis = currentTime.getTime();
  return astroTimeMillis;
}

function setForecastDetails(data) {
  document.getElementById("cards-container").innerHTML = "";
  let hour = data.forecastday[0];

  let j = 0;
  for (let i = 0; i < 8; i++) {
    let time = hour.hour[j].time;
    let icon = hour.hour[j].condition.icon;
    let temp = hour.hour[j].temp_c;
    let rain = hour.hour[j].chance_of_rain;
    createForecastCard(time, icon, temp, rain);
    j += 3;
  }
}
function setAlertsData(data) {
  if (data.alert.length > 0) {
    document.getElementById("alerts-container-main").innerHTML = "";
    for (let i = 0; i < data.alert.length; i++) {
      
      let headline = data.alert[i].headline;
      let severity = data.alert[i].severity;
      let areas = data.alert[i].areas;
      let description = data.alert[i].desc;
      let instruction = data.alert[i].instruction;
      createAlerts(headline, severity, areas, description, instruction);
    }
  } else {
  }
}
searchBtn.addEventListener("click", () => {
  let sinput = searchInput.value;
  fetchWeatherData(sinput, null, null);
});


