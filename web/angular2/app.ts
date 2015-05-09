/// <reference path="typings/angular2/angular2"/>
/// <reference path="../shared/icons" />
/// <reference path="../shared/api" />

import { Component, View, bootstrap } from 'angular2/angular2';

@Component({
    selector: 'app'
})

@View({
    templateUrl: 'app.html'
})

class WeatherComponent {
    query: string;
    weather = {
        temperature: {
            celsius: 0
        }
    };
    hasData = false;
    currentUnit = 'fahrenheit';
    constructor() {
    }
    setQuery(newQuery: string) {
        if (this.query === newQuery) {
            return false;
        }

        var self = this;

        this.query = newQuery;

        api.fetchCurrentWeather(this.query).then(function (result) {
            self.setWeatherData(result);
        });

        return false;
    }
    setWeatherData(data) {
        this.weather = data;
        this.hasData = true;
    }
    setUnit(unit: string) {
        this.currentUnit = unit;
    }
}

bootstrap(WeatherComponent);