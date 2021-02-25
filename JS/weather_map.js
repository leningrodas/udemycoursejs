$(document).ready(function () {


    "use strict";

    //global variables for geolaction-- can be reused throughout the code
    var userLat;
    var userLong;
    var originalUserLat;
    var originalUserLong;
    var userMarker = new mapboxgl.Marker({draggable: true});

    //map
    mapboxgl.accessToken = mapboxToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
        center: [-96.7969, 32.7763], // starting position [lng, lat]
        zoom: 10
    });




    // get geolocation of user and store it in coordinates
    function geolocation(){
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function (position){
                userLat = position.coords.latitude;
                userLong = position.coords.longitude;
                retrieveWeather(userLat, userLong);
                map.setCenter([userLong, userLat])
                userMarker.addTo(map);
            })
        } else {
            retrieveWeather(-96.7969, 32.7763);
            map.setCenter([-96.7969, 32.7763]);
        }
    }
    geolocation();






   // to get local weather
   function retrieveWeather(lat, long)
    {
        $.get("https://api.openweathermap.org/data/2.5/onecall", {
            APPID: OPEN_WEATHER_APPID,
            lat: lat,
            lng: long,
            units: "imperial",
            exclude: "minutely,hourly,alerts"
        }).done(function (data) {
            dropPin();
            console.log(data);

        });

    }


    // draggble marker
    function onDragEnd() {
        var lngLat = userMarker.getlngLat();
        userLat = lngLat.lat;
        userLong = lngLat.long;
        retrieveWeather(userLong, userLat);
        map.setCenter([userLong, userLat]);
        userMarker.setLngLat([userLong, userLat])

    }

    userMarker.on("dragend", onDragEnd);








    const currentMarkers = [];

    function dropPin(coordinates){

        currentMarkers.push(userMarker);
        currentMarkers[0].setLngLat(coordinates)
        currentMarkers[0].addTo(map);
    }

    function enablePin(){
        map.on('click', function (e){
            dropPin(e.LngLat);
            console.log(e.lngLat);
            retrieveWeather(e.lngLat.lon, e.lngLat.lat);
        });
    }



    //catches the users input on the text box to search for a city
    $('#userInput').change(function (event) {
        console.log($('#userInput').val());
        var longLat = [];
        var userEntry = geocode($('#userInput').val(), mapboxToken).then(function (results) {
            longLat[0] = results[0];
            longLat[1] = results[1]
            console.log(longLat[0], longLat[1]);
            userMarker.setLngLat(longLat);
            map.setCenter([longLat[0],longLat[1]])
//                 map.flyTo({
// // These options control the ending camera position: centered at the target, at zoom level 9, and north up.
//                     center: [userMarker],
//                     zoom: 9,
//                     bearing: 0,
// // These options control the flight curve, making it move slowly and zoom out almost completely before starting to pan.
//                     speed: 0.6, // make the flying slow
//                     curve: 1, // change the speed at which it zooms out
// // this animation is considered essential with respect to prefers-reduced-motion
//                     essential: true
//                 });
//                 // setCenter(results);
//                 // userMarker.setLngLat(map.getCenter());
        });
    });

    map.on('dblclick', function (e) {
        setTimeout(function () {
            userLat = [e.lngLat.lat];
            userLong = [e.lngLat.lng];
            console.log(userLatitude);
            console.log(userLongitude);
            // map.setCenter([userLongitude, userLatitude]);
            userMarker.setLngLat([userLong, userLat]);
            retrieveWeather(userLong, userLat);

// and now we're at the opposite point
            map.flyTo({
// These options control the ending camera position: centered at the target, at zoom level 9, and north up.
                center: [userLongitude, userLatitude],
                zoom: 9,
                bearing: 0,
// These options control the flight curve, making it move slowly and zoom out almost completely before starting to pan.
                speed: 0.75, // make the flying slow
                curve: 1, // change the speed at which it zooms out
// this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            }, 0);
        });

    });

});





    var coordinates = document.getElementById('coordinates');






    //the search button function
    $('#submitWeather').click(function() {
        const city = $("#userInput").val();
        if (city !== '') {
            $.get("http://api.openweathermap.org/data/2.5/weather", {
                APPID: OPEN_WEATHER_APPID,
                q: city,
                units: "imperial"
            }).done( function (data) {
                    var widget = show(data);

                    $("#map").html(widget);

                    $("#city").val('');
                    console.log(data);
                }
            );
        } else {
            $('#error').html('Field cannot be empty');
        }

    });



    function show(data) {
        var html = '<div id="weatherCard" class="card" style="height: 18em; width: 18em; color: whitesmoke; border: 5px solid;">';
        html += '<h3 class="card-header justify-content-center"><strong>Weather</strong></h3>'
        html += "<li><strong>Temperature</strong>: " + data.main.temp + "</li>"
        html += "<li><strong>Humidity</strong>: " + data.main.humidity + "</li>"
        html += "<li class='justify-content-center'><strong>Pressure</strong>: " + data.main.pressure + "</li>"
        html += "<li><strong>Feels like</strong>: " + data.main.feels_like + "</li>"
        html += '</div>';

        $('#weatherCard').append(html)
    }