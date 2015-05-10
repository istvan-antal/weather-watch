/* global WW  */

$(function () {
    var searchForm = $('#search-form'),
        searchField = $('#search-field'),
        unitSelector = $('#unit-selector'),
        unitSelectorButtons = unitSelector.find('button'),
        currentUnit = 'fahrenheit',
        display = new WW.WeatherDisplay($('#weather-display'), currentUnit),
        model = new WW.WeatherModel();

    searchForm.submit(function () {
        model.setAddress(searchField.val());
        return false;
    });
    
    model.onDataUpdate(function (data) {
        display.setData(data);
    });

    unitSelector.on('click', 'button', function () {
        var element = $(this);

        currentUnit = element.data('value');
        
        unitSelectorButtons.removeClass('active');
        element.addClass('active');

        display.setUnit(currentUnit);
    });
    
});