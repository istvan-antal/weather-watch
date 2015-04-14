<?php

namespace Client;

use GuzzleHttp\Client;

use Unit\Temperature;

class Forecast {
    
    private $client;
    
    public function __construct($apiKey) {
        $this->client = new Client(array(
            'base_url' => "https://api.forecast.io/forecast/$apiKey/"
        ));
    }

    public function fetchForecast($latitude, $longitude) {
        $response = $this->client->get("$latitude,$longitude");
        
        $responseValue = $response->json()['currently'];
        
        $temperatureConverter = new Temperature();
        
        return array(
            'summary' => $responseValue['summary'],
            'icon' => $responseValue['icon'],
            'temperature' => array(
                'fahrenheit' => $responseValue['temperature'],
                'celsius' => $temperatureConverter->fahrenheitToCelsius($responseValue['temperature'])
            )
        );
    }
    
}