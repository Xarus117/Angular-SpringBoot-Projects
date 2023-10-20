package com.gebczyk.weather;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "*")
public class WeatherController {
    private final String apiKey = "19cbf39e2d05498a9bf100552232010";
    private final RestTemplate restTemplate;
    
    @Autowired
    public WeatherController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    @GetMapping("/weather")
    public String getWeather(@RequestParam String city) {
        String apiUrl = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + city;
        String response = restTemplate.getForObject(apiUrl, String.class);
        return response;
    }
}
