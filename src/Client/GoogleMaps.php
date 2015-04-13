<?php

namespace Client;

use GuzzleHttp\Client;

class GoogleMaps {
    
    private $client;
    
    public function __construct() {
        $this->client = new Client(array(
            'base_url' => 'https://maps.googleapis.com'
        ));
    }

    public function geocodeAddress($address) {
        $response = $this->client->get('/maps/api/geocode/json', array(
            'query' => array(
                'address' => $address
            )
        ));
        
        return $response->json();
    }
    
}