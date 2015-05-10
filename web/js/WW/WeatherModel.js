/* global api, WW  */

WW.WeatherModel = function () {
    this._address = null;
    this._data = null;
    this._dataUpdateHandlers = [];
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