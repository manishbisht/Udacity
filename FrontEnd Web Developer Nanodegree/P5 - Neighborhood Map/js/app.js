/**
 * Created by Manish Bisht on 11/13/2016.
 */

var map;

// Triggers the HTML5 suggestions onClick instead of doubleClick
$('.search-field').mousedown(function () {
    if (document.activeElement == this)return;
    $(this).focus();
});

// Content of all the locations
var markers = [
    {
        title: "Bhaskar Vidhya Ashram",
        subtitle: "Private School",
        latitude: 26.9053803,
        longitude: 75.7259351,
        streetAddress: "Lalarpura Road, Gandhi Path, Maa Karni Nagar",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "NA",
        mobileNumber: "+91-9414336040",
        show : true
    },
    {
        title: "Hotel Chhavi Holidays",
        subtitle: "Hotel",
        latitude: 26.9055311,
        longitude: 75.728137,
        streetAddress: "Plot No. 11/12, Vivek Vihar, Gandhi Path (W)",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "NA",
        mobileNumber: "0141-2471972",
        show : true
    },
    {
        title: "Handi",
        subtitle: "Restaurant",
        latitude: 26.906990,
        longitude: 75.742848,
        streetAddress: "18, Gautam Marg, Vaishali Nagar, Nemi Nagar",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "http://handirestaurant.com/",
        mobileNumber: "0141-4016200",
        show : true
    },
    {
        title: "INOX - Amrapali",
        subtitle: "Movie Theater",
        latitude: 26.912631,
        longitude: 75.743389,
        streetAddress: "C-1, Vaibhav Complex, C Block, Amrapali Circle",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "http://www.inoxmovies.com/",
        mobileNumber: "0141-5114482",
        show : true
    },
    {
        title: "Blue Dart",
        subtitle: "Courier Service",
        latitude: 26.911103,
        longitude: 75.738878,
        streetAddress: "Vaishali Tower, Vaishali Nagar",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "https://www.bluedart.com/",
        mobileNumber: "0141-5105898",
        show : true
    },
    {
        title: "Hotel Seven Seas",
        subtitle: "3-Star Hotel",
        latitude: 26.906069,
        longitude: 75.739583,
        streetAddress: "A-6, Nemi Nagar, Gandhi Path",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "http://www.hotelsevenseasjaipur.com/",
        mobileNumber: "0141-5108030",
        show : true
    },
    {
        title: "Global Heart & General Hospital",
        subtitle: "Hospital",
        latitude: 26.905506,
        longitude: 75.738762,
        streetAddress: "C1/27, Opposite Bharat Apartment",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "http://heartandgeneralhospital.com/",
        mobileNumber: "0141-2440629",
        show : true
    },
    {
        title: "Shri Swaminarayan Mandir",
        subtitle: "Hindu Temple",
        latitude: 26.902167,
        longitude: 75.740999,
        streetAddress: "Sector 9, Chitrakoot",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "http://www.baps.org/",
        mobileNumber: "0141-2246100",
        show : true
    },
    {
        title: "Pratap Marriage Garden",
        subtitle: "Banquet Hall",
        latitude: 26.906464,
        longitude: 75.732889,
        streetAddress: "Arpit Nagar, B Block, Vaishali Nagar",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "NA",
        mobileNumber: "NA",
        show : true
    },
    {
        title: "ICICI Bank",
        subtitle: "Bank",
        latitude: 26.913179,
        longitude: 75.743447,
        streetAddress: "Lalarpura Road, Gandhi Path, Maa Karni Nagar",
        cityAddress: "Jaipur, Rajasthan, IN",
        url: "https://www.icicibank.com",
        mobileNumber: "0141-3366777",
        show : true
    }
];

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
    self.markers = ko.observableArray([
        new self.marker(),
        new self.marker(),
        new self.marker(),
        new self.marker(),
        new self.marker(),
        new self.marker(),
        new self.marker(),
        new self.marker(),
        new self.marker(),
        new self.marker()
    ]);
    self.query = ko.observable("");
    self.showMarkers = ko.computed(function() {
        return ko.utils.arrayFilter(self.markers(), function(marker) {
            if(marker.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0){
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
        for(var i=0; i<markers.length;i++){
            if(markers[i].check==false){
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