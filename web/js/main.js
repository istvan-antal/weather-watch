/* global WW  */

$(function () {
    var searchForm = $('#search-form'),
        searchField = $('#search-field'),
        unitSelector = $('#unit-selector'),
        unitSelectorButtons = unitSelector.find('button'),
        model = new WW.WeatherModel(),
        display = new WW.WeatherDisplay($('#weather-display'), model.getUnit());

    searchForm.submit(function () {
        model.setAddress(searchField.val());
        return false;
    });
    
    model.onDataUpdate(function (data) {
        display.setData(data);
    });
    
    model.onUnitUpdate(function (unit) {
        display.setUnit(unit);
    });

    unitSelector.on('click', 'button', function () {
        var element = $(this);

        model.setUnit(element.data('value'));
        
        unitSelectorButtons.removeClass('active');
        element.addClass('active');        
    });
});