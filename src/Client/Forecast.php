<?php

namespace Client;

use GuzzleHttp\Client;

use Client\Forecast\ResultFormatter;

class Forecast {
    
    private $client;
    private $resultFormatter;
    
    public function __construct($apiKey) {
        $this->client = new Client(array(
            'base_url' => "https://api.forecast.io/forecast/$apiKey/"
        ));
        $this->resultFormatter = new ResultFormatter();
    }

    public function fetchForecast($latitude, $longitude) {
        $response = $this->client->get("$latitude,$longitude");
        return $this->resultFormatter->formatResult($response->json());
    }
    
}