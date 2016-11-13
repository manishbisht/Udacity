/**
 * Created by Manish Bisht on 11/13/2016.
 */
function AppViewModel() {
    var mapview = document.getElementById('map');
    mapview.style.height=window.innerHeight+"px";
    var myLatLng = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(mapview, {
        center: myLatLng,
        scrollwheel: false,
        zoom: 5,
        mapTypeControl: false
    });
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'
    });
    marker.addListener('click', toggleBounce);
    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
}

ko.applyBindings(new AppViewModel());