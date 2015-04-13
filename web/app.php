<?php

require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Client\GoogleMaps;
use Client\Forecast;

$app = new Application();

require '../config.php';

$app->get('/weather', function (Application $app, Request $request) {
    $googleMapsApi = new GoogleMaps();
    $forecastApi = new Forecast($app['forecast.io.api.key']);
    
    $coordinates = $googleMapsApi->geocodeAddress($request->get('address'));
    
    $forecast = $forecastApi->fetchForecast($coordinates['latitude'], $coordinates['longitude']);
    
    return new JsonResponse(array_merge($coordinates, $forecast));
});

$app->run();