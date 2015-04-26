<?php

namespace Unit;

class Temperature {
    
    public function fahrenheitToCelsius($fahrenheit) {
        if (!is_numeric($fahrenheit)) {
            throw new \Exception('Argument is not a number');
        }
        
        return ($fahrenheit - 32) * 5/9;
    }
    
    public function celsiusToFahrenheit($celsius) {
        if (!is_numeric($celsius)) {
            throw new \Exception('Argument is not a number');
        }
        
        return $celsius * 9/5 + 32;
    }
    
}