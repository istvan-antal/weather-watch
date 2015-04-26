<?php

namespace Client\Forecast;

use Unit\Temperature;

class ResultFormatter {

    public function formatResult($responseValue) {
        $currentData = $responseValue['currently'];
        
        $temperatureConverter = new Temperature();
        
        return array(
            'summary' => $currentData['summary'],
            'icon' => $currentData['icon'],
            'temperature' => array(
                'fahrenheit' => $temperatureConverter->celsiusToFahrenheit($currentData['temperature']),
                'celsius' => $currentData['temperature']
            ),
            'daily' => $responseValue['daily']['data']
        );
    }
    
}