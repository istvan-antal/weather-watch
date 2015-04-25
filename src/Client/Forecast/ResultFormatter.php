<?php

namespace Client\Forecast;

use Unit\Temperature;

class ResultFormatter {
    
    public function formatResult($responseValue) {
        $data = $responseValue['currently'];
        
        $temperatureConverter = new Temperature();
        
        return array(
            'summary' => $data['summary'],
            'icon' => $data['icon'],
            'temperature' => array(
                'fahrenheit' => $data['temperature'],
                'celsius' => $temperatureConverter->fahrenheitToCelsius($data['temperature'])
            )
        );
    }
    
}