/* global google */

$(function () {
    var searchForm = $('#search-form'),
        searchField = $('#search-field'),
        icon = $('#weather-icon'),
        tempature = $('#tempature'),
        results = $('#results'),
        summary = $('#summary'),
        comparism = $('#comparism'),
        unitSelector = $('#unit-selector'),
        unitSelectorButtons = unitSelector.find('button'),
        currentUnit = 'fahrenheit',
        currentData,
        mapOptions,
        map;

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

    searchForm.submit(function () {
        api.fetchCurrentWeather(searchField.val()).then(function (data) {
            currentData = data;
            renderCurrentData();
        });

        return false;
    });

    unitSelector.on('click', 'button', function () {
        var element = $(this);

        currentUnit = element.data('value');
        unitSelectorButtons.removeClass('active');
        element.addClass('active');

        renderCurrentData();
    });

    function renderCurrentData() {
        if (!currentData) {
            return;
        }

        tempature.html(
            Math.round(currentData.temperature[currentUnit]) +
            '<i class="wi wi-' + currentUnit + '"/>'
        );
        summary.text(currentData.summary);

        var comparismText  = '',
            temperatureDiff;

        temperatureDiff = currentData.temperature.celsius -
                          currentData.yesterday.temperature.celsius;

        if (temperatureDiff < 0) {
            comparismText = 'colder than yesterday';
        }

        if (temperatureDiff > 0) {
            comparismText = 'warmer than yesterday';
        }

        comparism.text(comparismText);

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