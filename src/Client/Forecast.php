<?php

namespace Client;

use GuzzleHttp\Client;

class Forecast {
    
    private $client;
    
    public function __construct($apiKey) {
        $this->client = new Client(array(
            'base_url' => "https://api.forecast.io/forecast/$apiKey/"
        ));
    }

    public function fetchForecast($latitude, $longitude) {
        $response = $this->client->get("$latitude,$longitude");
        
        return $response->json();
    }
    
}