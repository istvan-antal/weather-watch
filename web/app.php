<?php

require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Client\GoogleMaps;
use Client\Forecast;

$app = new Application();

require '../config.php';

$app->get('/weather', function (Application $app, Request $request) {
    $googleMapsApi = new GoogleMaps();
    $forecastApi = new Forecast($app['forecast.io.api.key']);
    
    $geocodeResponse = $googleMapsApi->geocodeAddress($request->get('address'));
    
    $coordinates = $geocodeResponse['results'][0]['geometry']['location'];
    
    $result = $forecastApi->fetchForecast($coordinates['lat'], $coordinates['lng']);
    
    return new JsonResponse($result);
});

$app->run();