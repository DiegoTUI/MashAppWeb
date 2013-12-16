// singleton to manage network calls
var network = new function(){
    //self reference
    var self = this;
    // requires
    var config = require('config.js');
    var Position = require('util/Position');
    //get foursquare venues
    self.getFoursquareVenues = function(latitude, longitude, callback){
    	if (config.useLocalResponse) {
    		var response = require('server/response.js').fsVenueSearchResponse;
    		callback (response);
    		return;
    	}
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            //Ti.API.debug("GetVenues. Callback: " + xhr.responseText);
            callback(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function() {
            Ti.API.info("GetFoursquareVenues. Error occurred");
        };
        var completeUrl = config.mashoopUrl + config.apiKey + '/fs-venue-search?ll=' + latitude + ',' + longitude;
        Ti.API.info("Opening connection: " + completeUrl);
        xhr.open("GET", completeUrl);
        xhr.send();
    };
    //get yelp venues
    self.getYelpVenues = function(latitude, longitude, callback){
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            //Ti.API.debug("GetVenues. Callback: " + xhr.responseText);
            callback(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function() {
            Ti.API.info("GetYelpVenues. Error occurred");
        };
        var completeUrl = config.mashoopUrl + config.apiKey + '/yp-search?ll=' + latitude + ',' + longitude;
        Ti.API.info("Opening connection: " + completeUrl);
        xhr.open("GET", completeUrl);
        xhr.send();
    };
    //get mashed up venues
    self.getMashoopVenues = function(latitude, longitude, callback){
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            //Ti.API.debug("GetVenues. Callback: " + xhr.responseText);
            callback(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function() {
            Ti.API.info("GetMashoopVenues. Error occurred");
        };
        var completeUrl = config.mashoopUrl + config.apiKey + '/ms-venues?ll=' + latitude + ',' + longitude;
        Ti.API.info("Opening connection: " + completeUrl);
        xhr.open("GET", completeUrl);
        xhr.send();
    };
    
    self.getCoordinates = function (address, callback) {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            //Ti.API.debug("GetCoordinates. Callback: " + xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            if (response['results'][0]['locations'][0]['latLng'] != undefined) {
                var position = new Position(response['results'][0]['locations'][0]['latLng']['lat'],
                                            response['results'][0]['locations'][0]['latLng']['lng']);
                return callback(position);
            } 
            
            callback(new Position(0,0));
        };
        xhr.onerror = function() {
            Ti.API.info("GetCoordinates. Error occurred");
        };
        var completeUrl = config.mapquestGeocodingUrl + address;
        Ti.API.info("Opening connection: " + completeUrl);
        xhr.open("GET", completeUrl);
        xhr.send();
    };
    
    self.getActivities = function (city, callback) {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() { 
            callback(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function() {
            Ti.API.info("GetActivities. Error occurred");
        };
        var completeUrl = config.mashoopUrl + config.apiKey + '/at-ticket-avail?destination=' + city;
        Ti.API.info("Opening connection: " + completeUrl);
        xhr.open("GET", completeUrl);
        xhr.send();
    };
    
    self.getHotels = function (city, callback) {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() { 
            callback(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function() {
            Ti.API.info("GetHotels. Error occurred");
        };
        var completeUrl = config.mashoopUrl + config.apiKey + '/at-hotel-list?destination=' + city;
        Ti.API.info("Opening connection: " + completeUrl);
        xhr.open("GET", completeUrl);
        xhr.send();
    };
    
    self.getHotelDetails = function (hotelCode, callback) {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() { 
            callback(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function() {
            Ti.API.info("GetHotels. Error occurred");
        };
        var completeUrl = config.mashoopUrl + config.apiKey + '/at-hotel-detail?code=' + hotelCode;
        Ti.API.info("Opening connection: " + completeUrl);
        xhr.open("GET", completeUrl);
        xhr.send();
    };
    
    self.getHotelsMS = function (city, callback) {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() { 
            callback(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function() {
            Ti.API.info("GetHotels. Error occurred");
        };
        var completeUrl = config.mashoopUrl + config.apiKey + '/ms-hotel-list?destination=' + city;
        Ti.API.info("Opening connection: " + completeUrl);
        xhr.open("GET", completeUrl);
        xhr.send();
    };
    
    return self;
};

module.exports = network;