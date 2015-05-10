/* global WW  */

$(function () {
    var searchForm = $('#search-form'),
        searchField = $('#search-field'),
        unitSelector = new WW.ButtonGroupSelect($('#unit-selector')),
        model = new WW.WeatherModel(),
        display = new WW.WeatherDisplay($('#weather-display'), model.getUnit());

    searchForm.submit(function () {
        model.setAddress(searchField.val());
        return false;
    });
    
    unitSelector.onValueUpdate(function (value) {
        model.setUnit(value);
    });
    
    model.onDataUpdate(function (data) {
        display.setData(data);
    });
    
    model.onUnitUpdate(function (unit) {
        display.setUnit(unit);
    });
});