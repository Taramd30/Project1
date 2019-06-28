var locations = [];
console.log(locations)
$("#find-brewery").on("click", function event(event) {
    event.preventDefault();
    $("#brewery-view").empty();
    var state = $("#brewery-input-state").val().trim();
    var city = $("#brewery-input-city").val().trim();
    $("#brewery-input-state").val("");
    $("#brewery-input-city").val("");
    //    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;  
    var queryURL = "https://api.openbrewerydb.org/breweries?by_state=" + state + "&by_city=" + city;
    //  console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var result = response;
        for (var i = 0; i < result.length; i++) {
            var location1 = result[i].latitude;
            var location2 = result[i].longitude;
            var name = result[i].name;
            var address = result[i].street;
            locations.push([name, address, location1, location2])
            // console.log(brewList)
            // console.log("this is your location: " + name,address,location1,location2);
            if (location1 && location2) {
                // $("#brewery-view").append("<p>" + location1 + " " + location2 + "</p>") 
            }
        }
    });
});
function getMap() {
    var googleURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA3SVRHtd9fyun6WGgFbLlKKnKGJ_9jl18';
    $.ajax({
        url: googleURL,
        method: 'GET',
        dataType: 'jsonp'
    }).then(function () {
        // 32.7767° N, 96.7970° W
        var latitude = 32.7767;
        var longitude = -96.7970;
        var x = parseFloat(latitude);
        var y = parseFloat(longitude);
        var latlng = new google.maps.LatLng(x, y);
        var myOptions = {
            zoom: 5,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map'), myOptions);
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][2], locations[i][3]),
                map: map
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                var x = "<h4>" + locations[i][0] + "</h4>" + "<h5>" + locations[i][1] + "</h5>";
                // console.log(x);
                return function () {
                    // console.log(x);
                    infowindow.setContent(x);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        };
    });
}
getMap()
var interval = $("#find-brewery")
$("#find-brewery").on("click", function () {
    if (locations !== '') {
        clearI();
        getMap()
    }
    else {
        event();
    }
})
function clearI() {
    clearInterval(interval);
    console.log(interval)
}