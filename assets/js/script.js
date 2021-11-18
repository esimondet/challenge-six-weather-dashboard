cityStore = "";

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

var getWeather = function () {
    var cityName = $("#cityName").val();

    var apiKey = "262802462fdd4f377221639cb1e44654";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        });
};


$(document).on("click", "button", function () {
    cityStore = $("#cityName");
    getWeather();
});


loadPage();