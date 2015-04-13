$(function () {
    var searchForm = $('#search-form'),
        searchField = $('#search-field'),
        icon = $('#weather-icon'),
        tempature = $('#tempature'),
        results = $('#results'),
        summary = $('#summary'),
        currentData,
        mapOptions,
        map,        
        iconMap;

    mapOptions = {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        zoom: 8
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    iconMap = {
        'partly-cloudy-night': 'night-partly-cloudy',
        'clear-day': 'day-sunny',
        'clear-night': 'night-clear',
        'rain': 'rain',
        'snow': 'snow',
        'sleet': 'sleet',
        'wind': 'day-windy',
        'fog': 'fog',
        'cloudy': 'cloudy',
        'partly-cloudy-day': 'night-cloudy',
        'hail': 'hail',
        'thunderstorm': 'thunderstorm',
        'tornado': 'tornado',
        'default': 'alien'
    };

    searchForm.submit(function () {
        $.ajax({
            url: '/weather',
            data: {
                address: searchField.val()
            }
        }).then(function (data) {
            currentData = data;
            renderCurrentData();
        });

        return false;
    });
    
    function renderCurrentData() {
        if (!currentData) {
            return;
        }
        
        tempature.html(currentData.temperature + '<i class="wi wi-fahrenheit"/>');
        summary.text(currentData.summary);
        icon.attr('class', getWeatherIconClass(currentData.icon));

        map.setCenter({
            lat: currentData.latitude,
            lng: currentData.longitude
        });

        results.removeClass('invisible');
    }
    
    function getWeatherIconClass(icon) {
        var mappedIcon = iconMap[icon];
        
        if (!mappedIcon) {
            mappedIcon = iconMap['default'];
        }
        
        return 'pull-right weather-icon wi wi-' + iconMap[icon];
    }
    
});