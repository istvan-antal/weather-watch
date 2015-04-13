$(function () {
    var searchForm = $("#search-form"),
        searchField = $("#search-field");
    
    var mapOptions = {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    };
    
    searchForm.submit(function () {
        var searchValue = searchField.val();
        
        
        
        return false;
    });

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
});