import { HttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeatherAppFrontEnd';
  cityForm: FormGroup;
  weatherData: any  | undefined;
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.cityForm = this.fb.group({
      cityName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const cityNameControl = this.cityForm.get('cityName');
    if (cityNameControl != null) {
      if (cityNameControl.valid) {
        const cityName = cityNameControl.value;
        this.weatherService.getWeather(cityName).subscribe(
          data => {
            console.log("Weather Data: ", data);
            this.weatherData = data;
            console.log(this.weatherData.current.temp_c);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}
