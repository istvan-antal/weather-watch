<?php

namespace Test\Client;

use Client\Forecast\ResultFormatter;

class ForecastTest extends \PHPUnit_Framework_TestCase {
    
    public function testErrorHandling() {
        /*$sampleLondonCoordinates = array(
            'latitude' => 51.5073509,
            'longitude' => -0.1277583
        );*/
        $data = json_decode(file_get_contents(__DIR__.'/Resources/sampleLondonResult.json'), true);
        $result = $this->instance->formatResult($data);
        
        $this->assertArrayHasKey('summary', $result);
        $this->assertArrayHasKey('icon', $result);
        $this->assertArrayHasKey('temperature', $result);
        $this->assertArrayHasKey('fahrenheit', $result['temperature']);
        $this->assertArrayHasKey('celsius', $result['temperature']);
    }
    
    private $instance;
    
    public function setUp() {
        $this->instance = new ResultFormatter();
    }
    
}