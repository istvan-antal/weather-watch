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
        $this->resultFormatter = new ResultFormatter($this->targetTimestamp);
    }

    public function fetchForecast($latitude, $longitude) {
        $todayResponse = $this->client->get("$latitude,$longitude?units=si");
        $result = $this->resultFormatter->formatResult($todayResponse->json());
        
        $yesterdaysTimestanp = gmmktime(0, 0, 0) - 24 * 3600;
        $yesterdayResponse = $this->client->get("$latitude,$longitude,$yesterdaysTimestanp?units=si");
        $result['yesterday'] = $this->resultFormatter->formatResult($yesterdayResponse->json());
        
        return $result;
    }
    
}