/**
 * Created by Manish Bisht on 11/13/2016.
 */

// Setting the maximum height of the searchResults box
document.getElementById("searchResults").style.maxHeight = (window.innerHeight-345)+"px";

// Setting the minimum width of the searchField
var width = window.innerWidth;
if(width<500)
    document.getElementById("search-field").style.minWidth = (width-10)+"px";


// Map class used to create maps
var Map = function () {
    var self = this;
    var mapView = document.getElementById('map');
    mapView.style.height = window.innerHeight + "px";
    self.mapOptions = {
        center: {lat: 26.907502, lng: 75.737586},
        zoom: 15,
        mapTypeControl: false,
    }
    self.map = new google.maps.Map(mapView, self.mapOptions);
    google.maps.event.addDomListener(window, "resize", function () {
        var center = self.map.getCenter();
        google.maps.event.trigger(self.map, "resize");
        self.map.setCenter(center);
    });
};

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

    // Map instance used to display markers on it
    self.map = new Map();

    // Holds the previous selected marker if any
    var prevMarker;

    /**
     * Class for creating map markers containts all the information about that point
     * @param {string} title [location name or title]
     * @param {string} subtitle [location category or subtitle]
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} streetAddress
     * @param {string} cityAddress
     * @param {string} url
     * @param {string} mobileNumber
     */
    self.marker = function (title, subtitle, latitude, longitude, streetAddress, cityAddress, url, mobileNumber) {
        this.title = title;
        this.subtitle = subtitle;
        this.latitude = latitude;
        this.longitude = longitude;
        this.streetAddress = streetAddress;
        this.cityAddress = cityAddress;
        this.url = url;
        this.show = true;
        this.mobileNumber = mobileNumber;
        //var url = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location=";
        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.latitude, this.longitude),
            title: this.title,
            animation: google.maps.Animation.DROP,
            map: self.map.map,
            contentString: "<strong>"+this.title+"</strong><br>"+this.subtitle+"<br>"+this.streetAddress+"<br>"+this.cityAddress
        });
        this.infoWindow = infowindow = new google.maps.InfoWindow({});
        this.marker.addListener('click', function () {
            infowindow.setContent(this.contentString);
            infowindow.open(self.map.map, this);
            self.map.map.setCenter(this.getPosition());
            if (prevMarker)
                prevMarker.setAnimation(null);
            prevMarker = this;
            this.setAnimation(google.maps.Animation.BOUNCE);
        });
        this.name = this.title+" - "+this.subtitle;
    }

    // Content of all the locations
    self.markers = ko.observableArray([
        new self.marker("Bhaskar Vidhya Ashram", "Private School", 26.9053803, 75.7259351, "Lalarpura Road, Gandhi Path", "Jaipur, Rajasthan, IN", "NA", "+91-9414336040"),
        new self.marker("Hotel Chhavi Holidays", "Hotel", 26.9055311, 75.728137, "Plot No. 11/12, Vivek Vihar", "Jaipur, Rajasthan, IN", "NA", "0141-2471972"),
        new self.marker("Handi", "Restaurant", 26.906990, 75.742848, "18, Gautam Marg, Vaishali Nagar", "Jaipur, Rajasthan, IN", "http://handirestaurant.com/", "0141-4016200"),
        new self.marker("INOX - Amrapali", "Movie Theater", 26.912631, 75.743389, "C-1, Vaibhav Complex", "Jaipur, Rajasthan, IN", "http://www.inoxmovies.com/", "0141-5114482"),
        new self.marker("Blue Dart", "Courier Service", 26.911103, 75.738878, "Vaishali Tower, Vaishali Nagar", "Jaipur, Rajasthan, IN", "https://www.bluedart.com/", "0141-5105898"),
        new self.marker("Hotel Seven Seas", "3-Star Hotel", 26.906069, 75.739583, "A-6, Nemi Nagar, Gandhi Path", "Jaipur, Rajasthan, IN", "http://www.hotelsevenseasjaipur.com/", "0141-5108030"),
        new self.marker("Global Heart & General Hospital", "Hospital", 26.905506, 75.738762, "C1/27, Opposite Bharat Apartment", "Jaipur, Rajasthan, IN", "http://heartandgeneralhospital.com/", "0141-2440629"),
        new self.marker("Shri Swaminarayan Mandir", "Hindu Temple", 26.902167, 75.740999, "Sector 9, Chitrakoot", "Jaipur, Rajasthan, IN", "http://www.baps.org/", "0141-2246100"),
        new self.marker("Pratap Marriage Garden", "Banquet Hall", 26.906464, 75.732889, "Arpit Nagar, B Block", "Jaipur, Rajasthan, IN", "NA", "NA"),
        new self.marker("ICICI Bank", "Bank", 26.913179, 75.743447, "Lalarpura Road, Gandhi Path", "Jaipur, Rajasthan, IN", "https://www.icicibank.com", "0141-3366777"),
    ]);

    // Keep track on search query
    self.query = ko.observable("");

    // Filtering markers array
    self.showMarkers = ko.computed(function () {
        return ko.utils.arrayFilter(self.markers(), function (marker) {
            if (marker.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0)
                return marker.show = true
            else
                return marker.show = false;
        });
    }, self);

    /*self.searchResults = ko.computed(function() {
        var q = self.query();
        return self.markers().filter(function(i) {
            return i.title.toLowerCase().indexOf(q) >= 0;
        });
    });

    self.searchResults.subscribe(function () {
        console.log(self.searchResults);
    });*/

    self.showList=ko.observable(false);
    /*self.showList.subscribe(function (value) {
        if(value)
            document.getElementsById('searchResults').show();
        else
            document.getElementsById('searchResults').hide();
    });*/
    // Hide/show markers based on search query
    self.showMarkers.subscribe(function () {
        if(infowindow)
            infowindow.close();
        for (var i = 0; i < self.markers().length; i++) {
            if (self.markers()[i].show == false)
                self.markers()[i].marker.setVisible(false);
            else
                self.markers()[i].marker.setVisible(true);
        }
    });
}

ko.applyBindings(new AppViewModel());

// loadMap fires at the end of this document loading process
//window.onload = loadMap();