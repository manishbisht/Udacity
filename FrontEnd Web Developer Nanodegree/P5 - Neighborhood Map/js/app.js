/**
 * Created by Manish Bisht on 11/13/2016.
 */

function AppViewModel() {
    var mapview = document.getElementById('map');
    mapview.style.height=window.innerHeight+"px";
    var myLatLng = {lat: 26.9053803, lng: 75.725935};
    var map = new google.maps.Map(mapview, {
        center: myLatLng,
        scrollwheel: false,
        zoom: 12,
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
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: 26.8542607, lng: 75.8050297},
        title: 'Hello World!'
    });
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: 26.8808251, lng: 75.7320332},
        title: 'Hello World!'
    });
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: 75.7425, lng: 26.9014},
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