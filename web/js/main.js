/* global api, WW  */

$(function () {
    var searchForm = $('#search-form'),
        searchField = $('#search-field'),
        unitSelector = $('#unit-selector'),
        unitSelectorButtons = unitSelector.find('button'),
        currentUnit = 'fahrenheit',
        display = new WW.WeatherDisplay($('#weather-display'), currentUnit);

    searchForm.submit(function () {
        api.fetchCurrentWeather(searchField.val()).then(function (data) {
            display.setData(data);
        });

        return false;
    });

    unitSelector.on('click', 'button', function () {
        var element = $(this);

        currentUnit = element.data('value');
        
        unitSelectorButtons.removeClass('active');
        element.addClass('active');

        display.setUnit(currentUnit);
    });
    
});