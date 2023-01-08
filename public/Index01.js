function setup() {
  noCanvas();
  let video = createCapture(VIDEO);
  video.size(260, 150);

  let button = document.getElementById("submit");
  button.addEventListener("click", event);

  async function event() {
    let text = document.getElementById("text").value;

    window.alert("picture capture");

    video.loadPixels();
    const image64 = video.canvas.toDataURL();

    // ! GeoLocation----------------
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (positions) {
        console.log(positions);
        //   console.log(positions.coords.latitude);
        //   console.log(positions.coords.longitude);

        let latitude = positions.coords.latitude;
        let longitude = positions.coords.longitude;

        // ! we are fetching data form server
        // ! sending lat,long data to the server (like submitting a form) that's why we using POST //send data in the form of json
        // ! data is send in any ways here we using a JSON.stringify(data)
        const data = { latitude, longitude, text, image64 };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const response = await fetch("/api", options);
        // ! here we see what we recive from server after sending request
        const json = await response.json();
        console.log(json);
      });
    } else {
      document.getElementById("map").textContent =
        "Geolocation is not supported by this browser.";
      console.log("Geolocation is not supported by this browser.");
    }
  }
}
function Getgeolocation() {
  // ! GeoLocation----------------
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (positions) {
      console.log(positions);
      //   console.log(positions.coords.latitude);
      //   console.log(positions.coords.longitude);

      let latitude = positions.coords.latitude;
      let longitude = positions.coords.longitude;

      document.getElementById("lat").textContent = latitude;
      document.getElementById("long").textContent = longitude;

      // //! making the map
      var map = L.map("map").setView([latitude, longitude], 11);
      L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png?api_key=AAPK22f3edca83a54a628f90fb713bae7e83kvPGDHtb8IAZ1di6G47UrqFtReTaxSNDQYLbZ5lmLVE_KZ12ThTZZdOMLe4XGy44 ",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(map);

      let marker = L.marker([latitude, longitude]).addTo(map);
    });
  } else {
    document.getElementById("map").textContent =
      "Geolocation is not supported by this browser.";
    console.log("Geolocation is not supported by this browser.");
  }
}
Getgeolocation();

// ! get time
let today = new Date();
let timenow = today.toLocaleString();
console.log(timenow);
