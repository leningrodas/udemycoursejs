$(document).ready(function () {

    mapboxgl.accessToken = mapboxToken;

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
        center: [-96.7969, 32.7763], // starting position [lng, lat]
        zoom: 10
    });

    $.get("https://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APPID,
        lat: 29.423017,
        lon: -98.48527,
        units: "imperial",
        exclude: "minutely,hourly,alerts"
    }).done(function (data) {
        dropPin();
        console.log(data);

    });


    var currentMarkers = [];

    function dropPin(coordinates){
        var marker = new mapboxgl.Marker()
        currentMarkers.push(marker);
        currentMarkers[0].setLngLat(coordinates)
        currentMarkers[0].addTo(map);
    }

    function enablePin(){
        map.on('click', function (e){
            dropPin(e.lngLat);
            console.log(e.lngLat);
            retrieveWeather(e.lngLat.lng, e.lngLat.lat);
        });
    }

    function retrieveWeather(longitude, latitude){
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: OPEN_WEATHER_APPID,
            lat: latitude,
            lon: longitude,
            units: "imperial"
        }).done(function (data) {
            console.log(data);
        });

    }






    // var coordinates = document.getElementById('coordinates');
    //
    var dallasLocation = new mapboxgl.Marker()
        .setLngLat([-96.7969, 32.7763])
        .setDraggable(true)
        .addTo(map);

    //





    function onDragEnd() {
        var lngLat = dallasLocation.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML =
            'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        console.log(lngLat)
    }









    // $('#submitWeather').click(function() {
    //     var city = $("#userInput").val();
    //     if (city != '') {
    //         $.get("http://api.openweathermap.org/data/2.5/weather", {
    //             APPID: OPEN_WEATHER_APPID,
    //             q: city,
    //             units: "imperial"
    //         }).done( function (data) {
    //                 var widget = show(data);
    //
    //                 $("#map").html(widget);
    //
    //                 $("#city").val('');
    //                 console.log(data);
    //             }
    //         );
    //     } else {
    //         $('#error').html('Field cannot be empty');
    //     }
    //
    // });



    function show(data){
        var html = '<div id="weathercard" class="card" style="height: 18em; width: 18em; color: whitesmoke; border: 5px solid;">';
        html +='<h3 class="card-header justify-content-center"><strong>Weather</strong></h3>'
        html += "<li><strong>Temperature</strong>: " + data.main.temp + "</li>"
        html += "<li><strong>Humidity</strong>: " + data.main.humidity + "</li>"
        html += "<li class='justify-content-center'><strong>Pressure</strong>: " + data.main.pressure + "</li>"
        html += "<li><strong>Feels like</strong>: " + data.main.feels_like + "</li>"
        html +='</div>';

        $('#weathercard').append(html);

    }
});