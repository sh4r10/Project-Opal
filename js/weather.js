// On window load
$(document).ready(function() {

var btn = $(".refresh-icon");
btn.on("click", showWeather);

function showWeather(){
		$(".degrees").html("<i class='material-icons'>autorenew</i>");
		$(".description").html("");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				getWeather(lat, lon);
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}

		function getWeather(lat, lon) {
			WeatherAPI = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;

			$.getJSON(WeatherAPI, function(data) {

				today = new Date();
				time = today.getHours() + ":"+today.getMinutes();

				var description = data.weather[0].main;
				var temp = data.main.temp;
				var city = data.name;
				var country = countryName(data.sys.country);
				var tempR = Math.round(temp);

				genIcon(description);
				$(".description").html(description);

				function genIcon(con) {
					desc = con.toLowerCase();
					if (desc !== "clear") {
						$(".weather-icon").html("wb_cloudy");
					} else {
						$(".weather-icon").html("wb_sunny");
					}
				}

				function countryName(code) {
					var codes = ["SE", "PK"];
					var countries = ["Sweden", "Pakistan"];
					var found = false;

					for (i = 0; i < codes.length; i++) {
						if (code == codes[i]) {
							return countries[i];
							found = true;
						}
					}
					if (!found) {
						return code;
					}
				}

				$(".location").html(city + ", " + country);
				$(".degrees").html(tempR + "° ");
				$(".last-refreshed").html("Just now");
				showTime();

				function showTime(){
					setTimeout(function(){
						$(".last-refreshed").html("Last updated at "+time);
					}, 120000);
				}

			});
		}
	}
	showWeather();
});
