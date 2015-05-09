/// <reference path="typings/tsd.d.ts" />

let api = {
    fetchCurrentWeather: function(address: string) {
        return $.ajax({
            url: '/api/weather',
            data: {
                address: address
            }
        });
    }
};