/**
 * Created by Manish Bisht on 11/13/2016.
 */

// Triggers the HTML5 suggestions onClick instead of doubleClick
$('.search-field').mousedown(function(){
    if( document.activeElement == this )return;
    $(this).focus();
});

var markers = [
    {
        title : "Bhaskar Vidhya Ashram",
        subtitle : "Private School",
        latitude : 26.9053803,
        longitude : 75.7259351,
        streetAddress : "Lalarpura Road, Gandhi Path, Maa Karni Nagar",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "NA",
        mobileNumber : "+91-9414336040"
    },
    {
        title : "Hotel Chhavi Holidays",
        subtitle : "Hotel",
        latitude : 26.9055311,
        longitude : 75.728137,
        streetAddress : "Plot No. 11/12, Vivek Vihar, Gandhi Path (W)",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "NA",
        mobileNumber : "0141-2471972"
    },
    {
        title : "Handi",
        subtitle : "Restaurant",
        latitude : 26.906990,
        longitude : 75.742848,
        streetAddress : "18, Gautam Marg, Vaishali Nagar, Nemi Nagar",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "http://handirestaurant.com/",
        mobileNumber : "0141-4016200"
    },
    {
        title : "INOX - Amrapali",
        subtitle : "Movie Theater",
        latitude : 26.912631,
        longitude : 75.743389,
        streetAddress : "C-1, Vaibhav Complex, C Block, Amrapali Circle",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "http://www.inoxmovies.com/",
        mobileNumber : "0141-5114482"
    },
    {
        title : "Blue Dart",
        subtitle : "Courier Service",
        latitude : 26.911103,
        longitude : 75.738878,
        streetAddress : "Vaishali Tower, Vaishali Nagar",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "https://www.bluedart.com/",
        mobileNumber : "0141-5105898"
    },
    {
        title : "Hotel Seven Seas",
        subtitle : "3-Star Hotel",
        latitude : 26.906069,
        longitude : 75.739583,
        streetAddress : "A-6, Nemi Nagar, Gandhi Path",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "http://www.hotelsevenseasjaipur.com/",
        mobileNumber : "0141-5108030"
    },
    {
        title : "Global Heart & General Hospital",
        subtitle : "Hospital",
        latitude : 26.905506,
        longitude : 75.738762,
        streetAddress : "C1/27, Opposite Bharat Apartment",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "http://heartandgeneralhospital.com/",
        mobileNumber : "0141-2440629"
    },
    {
        title : "Arpit Nagar, B Block, Vaishali Nagar",
        subtitle : "Hindu Temple",
        latitude : 26.902167,
        longitude : 75.740999,
        streetAddress : "Sector 9, Chitrakoot",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "http://www.baps.org/",
        mobileNumber : "0141-2246100"
    },
    {
        title : "Pratap Marriage Garden",
        subtitle : "Banquet Hall",
        latitude : 26.906464,
        longitude : 75.732889,
        streetAddress : "Arpit Nagar, B Block, Vaishali Nagar",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "NA",
        mobileNumber : "NA"
    },
    {
        title : "ICICI Bank",
        subtitle : "Bank",
        latitude : 26.913179,
        longitude : 75.743447,
        streetAddress : "Lalarpura Road, Gandhi Path, Maa Karni Nagar",
        cityAddress : "Jaipur, Rajasthan, IN",
        url : "https://www.icicibank.com",
        mobileNumber : "0141-3366777"
    }
];
function AppViewModel() {
    var mapview = document.getElementById('map');
    mapview.style.height=window.innerHeight+"px";
    var myLatLng = {lat: 26.907502, lng: 75.737586};
    var map = new google.maps.Map(mapview, {
        center: myLatLng,
        scrollwheel: false,
        zoom: 15,
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