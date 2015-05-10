/* global WW  */

$(function () {
    var searchBox = new WW.SearchBox($('#search-form')),
        unitSelector = new WW.ButtonGroupSelect($('#unit-selector')),
        model = new WW.WeatherModel(),
        display = new WW.WeatherDisplay($('#weather-display'), model.getUnit());

    searchBox.onValueEnter(function (value) {
        model.setAddress(value);
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