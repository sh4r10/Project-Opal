// On window load
$(document).ready(function () {

	refresh();
	var btn = $(".refresh-icon");
	btn.on("click", refresh);

	function showWeather() {
		$(".degrees").html("<i class='material-icons'>autorenew</i>");
		$(".description").html("");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				getWeather(lat, lon);
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}

		function getWeather(lat, lon) {
			var api = "1dd9580ced50ad6d3e08ff663cd74791";
			WeatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + api + "&units=metric";

			$.getJSON(WeatherAPI, function (data) {

				var today = new Date();
				var time = today.getHours() + ":" + today.getMinutes();
				localStorage.setItem("time",time);

				var description = data.weather[0].main;
				var temp = Math.round(data.main.temp);
				var city = data.name;
				var country = countryName(data.sys.country);


				localStorage.setItem("description", description);
				localStorage.setItem("temp", temp);
				localStorage.setItem("city", city);
				localStorage.setItem("country", country);

				displayWeather();
			});
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
	}
	function displayWeather() {
		$(".degrees").html("<i class='material-icons'>autorenew</i>");
		genIcon(localStorage.getItem("description"));
		$(".description").html(localStorage.getItem("description"));

		function genIcon(con) {
			desc = con.toLowerCase();
			if (desc !== "clear") {
				$(".weather-icon").html("wb_cloudy");
			} else {
				$(".weather-icon").html("wb_sunny");
			}
		}

		$(".location").html(localStorage.getItem("city") + ", " + localStorage.getItem("country"));
		$(".degrees").html(localStorage.getItem("temp") + "° ");
		$(".last-refreshed").html("Just now");
		showTime();
	}
	function showTime() {
		setTimeout(function () {
			$(".last-refreshed").html("Last updated at " + localStorage.getItem("time"));
		}, 120000);
	}
	function refresh() {

		if (localStorage.refreshed) {
			localStorage.refreshed = Number(localStorage.refreshed) + 1;
		} else {
			localStorage.refreshed = 1;
		}
		console.log(localStorage.refreshed)
		today = new Date();
		newtime = today.getHours() + ":"+today.getMinutes();
		if(localStorage.getItem("time") !== newtime){
			localStorage.refreshed = 0;
		}

		if (localStorage.refreshed < 2) {
			console.log("getting new weather");
			showWeather();
		} else {
			console.log("getting old weather");
			displayWeather();
		}
	}

});
