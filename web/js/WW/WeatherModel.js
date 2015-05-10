/* global api, WW  */

WW.WeatherModel = function () {
    this._address = null;
    this._data = null;
    this._dataUpdateHandlers = [];
    this._unitUpdateHandlers = [];
    this._unit = 'fahrenheit';
};

WW.WeatherModel.prototype.getUnit = function () {
    return this._unit;
};

WW.WeatherModel.prototype.setUnit = function (unit) {
    if (this._unit === unit) {
        return;
    }
    
    var self = this;
    
    this._unit = unit;
    this._unitUpdateHandlers.forEach(function (fn) {
        fn(self._unit);
    });
};

WW.WeatherModel.prototype.onUnitUpdate = function (fn) {
    this._unitUpdateHandlers.push(fn);
};

WW.WeatherModel.prototype.setAddress = function (address) {
    if (this._address === address) {
        return;
    }
    
    var self = this;
    
    this._address = address;
    
    api.fetchCurrentWeather(this._address).then(function (data) {
        self._data = data;
        self._dataUpdateHandlers.forEach(function (fn) {
            fn(self._data);
        });
    });
};

WW.WeatherModel.prototype.onDataUpdate = function (fn) {
    this._dataUpdateHandlers.push(fn);
};