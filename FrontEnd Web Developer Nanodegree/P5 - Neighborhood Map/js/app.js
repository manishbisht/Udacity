/**
 * Created by Manish Bisht on 11/13/2016.
 */

var map;

// Triggers the HTML5 suggestions onClick instead of doubleClick
$('.search-field').mousedown(function () {
    if (document.activeElement == this)return;
    $(this).focus();
});

// Initialize the map and its content
function loadMap() {
    var mapview = document.getElementById('map');
    var mapOptions = {
        center: {lat: 26.907502, lng: 75.737586},
        zoom: 15,
        mapTypeControl: false
    }
    mapview.style.height = window.innerHeight + "px";
    map = new google.maps.Map(mapview, mapOptions);
    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
    showMarkers(markers);
}

// Displays markers on the map
function showMarkers(locations, query) {
    var prevMarker, marker, infowindow;
    for (var i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: {lat: locations[i].latitude, lng: locations[i].longitude},
            map: map,
            animation: google.maps.Animation.DROP,
            title: locations[i].title,
            contentString: locations[i].subtitle
        });
        infowindow = new google.maps.InfoWindow({});
        marker.addListener('click', function () {
            infowindow.setContent(this.contentString);
            infowindow.open(map, this);
            map.setCenter(this.getPosition());
            if (prevMarker) {
                prevMarker.setAnimation(null);
            }
            prevMarker = this;
            this.setAnimation(google.maps.Animation.BOUNCE);
        });
        //console.log(map.getBounds());
    }
}
function AppViewModel() {
    var self = this;
    self.marker = function (title, subtitle, latitide, logitude, streetAddress, cityAddress, url, mobileNumber) {
        this.title = title;
        this.subtitle = subtitle;
        this.latitude = latitide;
        this.longitude = logitude;
        this.streetAddress = streetAddress;
        this.cityAddress = cityAddress;
        this.url = url;
        this.mobileNumber = mobileNumber;
        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitide, longitude),
            title: title,
            animation: google.maps.Animation.DROP,
            map: map,
            contentString: locations[i].subtitle
        });
        //self.infoWindow = new google.maps.InfoWindow({});
    }

    // Content of all the locations
    self.markers = ko.observableArray([
        new self.marker("Bhaskar Vidhya Ashram", "Private School", 26.9053803, 75.7259351, "Lalarpura Road, Gandhi Path, Maa Karni Nagar", "Jaipur, Rajasthan, IN", "NA", "+91-9414336040"),
        new self.marker("Hotel Chhavi Holidays", "Hotel", 26.9055311, 75.728137, "Plot No. 11/12, Vivek Vihar, Gandhi Path (W)", "Jaipur, Rajasthan, IN", "NA", "0141-2471972"),
        new self.marker("Handi", "Restaurant", 26.906990, 75.742848, "18, Gautam Marg, Vaishali Nagar, Nemi Nagar", "Jaipur, Rajasthan, IN", "http://handirestaurant.com/", "0141-4016200"),
        new self.marker("INOX - Amrapali", "Movie Theater", 26.912631, 75.743389, "C-1, Vaibhav Complex, C Block, Amrapali Circle", "Jaipur, Rajasthan, IN", "http://www.inoxmovies.com/", "0141-5114482"),
        new self.marker("Blue Dart", "Courier Service", 26.911103, 75.738878, "Vaishali Tower, Vaishali Nagar", "Jaipur, Rajasthan, IN", "https://www.bluedart.com/", "0141-5105898"),
        new self.marker("Hotel Seven Seas", "3-Star Hotel", 26.906069, 75.739583, "A-6, Nemi Nagar, Gandhi Path", "Jaipur, Rajasthan, IN", "http://www.hotelsevenseasjaipur.com/", "0141-5108030"),
        new self.marker("Global Heart & General Hospital", "Hospital", 26.905506, 75.738762, "C1/27, Opposite Bharat Apartment", "Jaipur, Rajasthan, IN", "http://heartandgeneralhospital.com/", "0141-2440629"),
        new self.marker("Shri Swaminarayan Mandir", "Hindu Temple", 26.902167, 75.740999, "Sector 9, Chitrakoot", "Jaipur, Rajasthan, IN", "http://www.baps.org/", "0141-2246100"),
        new self.marker("Pratap Marriage Garden", "Banquet Hall", 26.906464, 75.732889, "Arpit Nagar, B Block, Vaishali Nagar", "Jaipur, Rajasthan, IN", "NA", "NA"),
        new self.marker("ICICI Bank", "Bank", 26.913179, 75.743447, "Lalarpura Road, Gandhi Path, Maa Karni Nagar", "Jaipur, Rajasthan, IN", "https://www.icicibank.com", "0141-3366777")
    ]);
    self.query = ko.observable("");
    self.showMarkers = ko.computed(function () {
        return ko.utils.arrayFilter(self.markers(), function (marker) {
            if (marker.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
                marker.show = true
            }
            else {
                marker.show = false;
            }
        });
        //self.markers.removeAll();
        /*for(var x in markers) {
         if(markers[x].title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
         markers[x].display = true;
         //self.markers.push(markers[x]);
         }
         else {
         markers[x].display = false;
         }
         }*/
    }, self);
    self.showMarkers.subscribe(function () {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].check == false) {
                self.marker.setVisible(false);
            }
        }
        //console.log(markers);
        //showMarkers(markers);
    });
}

ko.applyBindings(new AppViewModel());

// loadMap fires at the end of this document loading process
window.onload = loadMap();