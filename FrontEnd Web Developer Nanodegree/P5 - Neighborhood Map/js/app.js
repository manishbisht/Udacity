/**
 * Created by Manish Bisht on 11/13/2016.
 */

// Setting the maximum height of the searchResults box
document.getElementById("searchResults").style.maxHeight = (window.innerHeight-345)+"px";

// Setting the minimum width of the searchField
var width = window.innerWidth;
if(width<500)
    document.getElementById("search-field").style.maxWidth = (width-10)+"px";

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
    self.marker = function (title, subtitle, latitude, longitude, streetAddress) {
        this.title = title;
        this.subtitle = subtitle;
        this.latitude = latitude;
        this.longitude = longitude;
        this.streetAddress = streetAddress;
        this.name = this.title+" - "+this.subtitle;
        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.latitude, this.longitude),
            animation: google.maps.Animation.DROP,
            map: self.map.map
        });
        google.maps.event.addListener(this.marker, 'click', function() {
            self.showInfoWindow(this);
        }.bind(this));
        google.maps.event.addListener(self.map.map, 'click', function() {
            self.infoWindow.close();
            if (prevMarker)
                prevMarker.setAnimation(null);
        });
    };

    // Content of all the locations
    self.markers = ko.observableArray([
        new self.marker("Bhaskar Vidhya Ashram", "Private School", 26.9053803, 75.7259351, "Lalarpura Road, Gandhi Path"),
        new self.marker("Hotel Chhavi Holidays", "Hotel", 26.9055311, 75.728137, "Plot No. 11/12, Vivek Vihar"),
        new self.marker("Handi", "Restaurant", 26.906990, 75.742848, "18, Gautam Marg, Vaishali Nagar"),
        new self.marker("INOX - Amrapali", "Movie Theater", 26.912631, 75.743389, "C-1, Vaibhav Complex"),
        new self.marker("Blue Dart", "Courier Service", 26.911103, 75.738878, "Vaishali Tower, Vaishali Nagar"),
        new self.marker("Hotel Seven Seas", "3-Star Hotel", 26.906069, 75.739583, "A-6, Nemi Nagar, Gandhi Path"),
        new self.marker("Global Heart & General Hospital", "Hospital", 26.905506, 75.738762, "C1/27, Opposite Bharat Apartment"),
        new self.marker("Shri Swaminarayan Mandir", "Hindu Temple", 26.902167, 75.740999, "Sector 9, Chitrakoot"),
        new self.marker("Pratap Marriage Garden", "Banquet Hall", 26.906464, 75.732889, "Arpit Nagar, B Block"),
        new self.marker("ICICI Bank", "Bank", 26.913179, 75.743447, "Lalarpura Road, Gandhi Path"),
    ]);

    // Keep track on search query
    self.query = ko.observable("");

    // Filtering markers array
    self.showMarkers = ko.computed(function () {
        return ko.utils.arrayFilter(self.markers(), function (marker) {
            if (marker.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0)
                return marker.show = true;
            else
                return marker.show = false;
        });
    }, self);

    // Shows the suggestions list
    self.showList=ko.observable(true);

    // Hides the suggestions list
    self.hideList = function () {
        this.showList(false);
    };

    // Hide/show markers based on search query
    self.showMarkers.subscribe(function () {
        self.showList(true);
        for (var i = 0; i < self.markers().length; i++) {
            if (self.markers()[i].show == false)
                self.markers()[i].marker.setVisible(false);
            else
                self.markers()[i].marker.setVisible(true);
        }
    });

    // creates a infoWindow to display marker details
    self.infoWindow = new google.maps.InfoWindow({});

    // displaying infowindow with marker details
    self.showInfoWindow = function (marker) {
        if (prevMarker)
            prevMarker.setAnimation(null);
        prevMarker = marker.marker;
        marker.marker.setAnimation(google.maps.Animation.BOUNCE);
        self.infoWindow.setContent('Loading Data...');
        self.map.map.setCenter(marker.marker.getPosition());
        self.map.map.panBy(0,-200);
        self.infoWindow.open(self.map.map, marker.marker);
        self.getInfo(marker);
        self.showList(false);
    };

    // Get location data from FourSquare
    self.getInfo = function (marker) {
        var clientId = "TPIDDHBKB2QFBWEV2MPDOFGUSWXCXGAA5IVOWEMN5ASR3UJW";
        var clientSecret= "4HB1ZZJBVXC3F0BREBPSGXYK0VZ5ALS4XRNJZSBP1JROG0DE";
        var url = "https://api.foursquare.com/v2/venues/search?client_id="+clientId+"&client_secret="+clientSecret+"&v=20130815&ll="+marker.latitude+","+marker.longitude+"&query="+marker.title+"&limit=1";
        $.getJSON(url)
            .done(function (response) {
                response =  response.response.venues[0];
                var html = "<strong>"+ marker.name +"</strong><br>";
                for(var i=0;i<response.location.formattedAddress.length;i++){
                    html+=response.location.formattedAddress[i]+ " ";
                    if(i%2!=0)
                        html+="<br>";
                }
                if(response.location.formattedAddress.length%2!=0)
                    html+="<br>";
                html+= "Number of CheckIns: "+response.stats.checkinsCount+"<br>";
                html+= "Number of Users: "+response.stats.usersCount+"<br>";
                html+= "Verified Place: "+(response.verified ? 'Yes' : 'No')+"<br>";
                if(response.contact.phone)
                    html+="Contact: "+response.contact.phone;
                self.infoWindow.setContent(html);
                //console.log(response);
            })
            .fail(function () {
                self.infoWindow.setContent('Failed to retrive data from FourSquare');
            });
    }
}

// Calls if the google maps is sucessfully loaded
function googleMapSuccess() {
    ko.applyBindings(new AppViewModel());
}

// Calls if google maps can't be loaded
function googleMapError() {
    document.body.innerHTML = "<center><h5>Please Try again !!<br> Unable to load Google Maps</h5></center>";
}