var cityStore = {
    "city": []
}

var apiKey = "262802462fdd4f377221639cb1e44654";

var loadPage = function () {
    var cityStore = localStorage.getItem("cities");
    if (cityStore != null) {
        cityStore = JSON.parse(cityStore);


        for (let i = 0; i < cityStore.length; i++) {

            var cityLi = $("<li class='space box'>");
            cityLi.attr("id", "city" + [i]);
            cityLi.html("#cityName").val();
            $("#cityStore").append(cityLi);
        }
    }

}

var weatherList = {
    "weather": []
}

var populateWeather = function () {
    var cityDiv = $("#currentLocation");
    cityDiv.html($("#cityName").val().toUpperCase() + " (" + moment(weatherList.weather.currentDate).format('L') + ") " + '<img src="' + weatherList.weather[0].currentIcon + '">');

    $("#cityTemp").html("Temp: " + weatherList.weather[0].currentTemp + '°F');
    $("#cityWind").html("Wind: " + weatherList.weather[0].currentWind + ' MPH');
    $("#cityHumid").html("Humidity: " + weatherList.weather[0].currentHumid + ' %');
    $("#cityUvi").html("UV Index: " + weatherList.weather[0].currentUvi);

    var numbers = ['One', 'Two', 'Three', 'Four', 'Five'];

    for (var i = 0; i < 5; i++) {
        $("#forecast"+ numbers[i] + "Date").html(moment(weatherList.weather[0].forecast[i].date).format('L'));
        $("#forecast"+ numbers[i] + "Icon").html('<img src="' + weatherList.weather[0].forecast[i].icon + '">');
        $("#forecast"+ numbers[i] + "Temp").html("Temp: " + weatherList.weather[0].forecast[i].temp + '°F');
        $("#forecast"+ numbers[i] + "Wind").html("Wind: " + weatherList.weather[0].forecast[i].wind + ' MPH');
        $("#forecast"+ numbers[i] + "Humid").html("Humidity: " + weatherList.weather[0].forecast[i].humid + ' %');
    }
}

var getWeather = function () {
    var cityName = $("#cityName").val();
    var locationUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

    const result = fetch(locationUrl, { method: "get" })
        .then(response => response.json())
        .then(data => {
            const lon = data.coord.lon;
            const lat = data.coord.lat;
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial");
        })
        .then(response => response.json())
        .catch(err => {
            console.log('Request failed', err)
        })
    result.then(onecall => {
        var weather = {
            "currentDate": onecall.current.dt,
            "currentIcon": "http://openweathermap.org/img/wn/" + onecall.current.weather[0].icon + ".png",
            "currentTemp": onecall.current.temp,
            "currentWind": onecall.current.wind_speed,
            "currentHumid": onecall.current.humidity,
            "currentUvi": onecall.current.uvi,
            "forecast": [{
                "date": onecall.daily[1].dt,
                "icon": "http://openweathermap.org/img/wn/" + onecall.daily[1].weather[0].icon + ".png",
                "temp": onecall.daily[1].temp.day,
                "wind": onecall.daily[1].wind_speed,
                "humid": onecall.daily[1].humidity,
            }, {
                "date": onecall.daily[2].dt,
                "icon": "http://openweathermap.org/img/wn/" + onecall.daily[2].weather[0].icon + ".png",
                "temp": onecall.daily[2].temp.day,
                "wind": onecall.daily[2].wind_speed,
                "humid": onecall.daily[2].humidity,
            }, {
                "date": onecall.daily[3].dt,
                "icon": "http://openweathermap.org/img/wn/" + onecall.daily[2].weather[0].icon + ".png",
                "temp": onecall.daily[3].temp.day,
                "wind": onecall.daily[3].wind_speed,
                "humid": onecall.daily[3].humidity,
            }, {
                "date": onecall.daily[4].dt,
                "icon": "http://openweathermap.org/img/wn/" + onecall.daily[5].weather[0].icon + ".png",
                "temp": onecall.daily[4].temp.day,
                "wind": onecall.daily[4].wind_speed,
                "humid": onecall.daily[4].humidity
            }, {
                "date": onecall.daily[5].dt,
                "icon": "http://openweathermap.org/img/wn/" + onecall.daily[5].weather[0].icon + ".png",
                "temp": onecall.daily[5].temp.day,
                "wind": onecall.daily[5].wind_speed,
                "humid": onecall.daily[5].humidity
            }]
        }
        weatherList.weather.push(weather);
        populateWeather();
    })
};

$(document).on("click", "button", function () {
    cityStore = $("#cityName").val().toUpperCase();
    getWeather();
});

loadPage();