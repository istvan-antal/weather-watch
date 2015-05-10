/* global WW, iconMap, google */

WW.WeatherDisplay = function (rootView, unit) {
    this._rootView = rootView;
    this._temperature = rootView.find('.weather-display-temperature');
    this._icon = rootView.find('.weather-display-icon');
    this._summary = rootView.find('.weather-display-summary');
    this._comparism = rootView.find('.weather-display-comparism');
    this._data = null;
    this._unit = unit;
    
    this._map = new google.maps.Map(rootView.find('.weather-display-map')[0], {
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
    });
};

WW.WeatherDisplay.prototype.setData = function (data) {
    this._data = data;
    this._render();
};

WW.WeatherDisplay.prototype.setUnit = function (unit) {
    if (this._unit === unit) {
        return;
    }
    
    this._unit = unit;
    this._render();
};

WW.WeatherDisplay.prototype._render = function () {
    var rootView = this._rootView,
        map = this._map,
        currentUnit = this._unit,
        temperature = this._temperature,
        icon = this._icon,
        summary = this._summary,
        comparism = this._comparism,
        currentData = this._data;
    
    if (!currentData) {
        return;
    }

    temperature.html(
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

    icon.attr('class', this._getWeatherIconClass(currentData.icon));

    map.setCenter({
        lat: currentData.latitude,
        lng: currentData.longitude
    });

    rootView.removeClass('invisible');
};

WW.WeatherDisplay.prototype._getWeatherIconClass = function (icon) {
    var mappedIcon = iconMap[icon];

    if (!mappedIcon) {
        mappedIcon = iconMap['default'];
    }

    return 'pull-right weather-icon wi wi-' + iconMap[icon];
};