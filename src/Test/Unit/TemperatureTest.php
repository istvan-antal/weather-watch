<?php

namespace Test\Unit;

use Unit\Temperature;

class TemperatureTest extends \PHPUnit_Framework_TestCase {
    
    /**
     * @var Temperature
     */
    private $instance;
    
    public function testFahrenheitToCelsius() {
        $this->assertEquals(-45.56, $this->toRoundedCelsius(-50));
        $this->assertEquals(7.38, $this->toRoundedCelsius(45.28));
        $this->assertEquals(21.11, $this->toRoundedCelsius(70));
    }
    
    /**
     * @expectedException \Exception
     */
    public function testFahrenheitToCelsiusForStringValue() {
        $this->instance->fahrenheitToCelsius('xzv');
    }
    
    /**
     * @expectedException \Exception
     */
    public function testFahrenheitToCelsiusForArrayValue() {
        $this->instance->fahrenheitToCelsius(array());
    }
    
    private function toRoundedCelsius($fahrenheit) {
        return round($this->instance->fahrenheitToCelsius($fahrenheit), 2);
    }
    
    public function setUp() {
        $this->instance = new Temperature();
    }
    
}