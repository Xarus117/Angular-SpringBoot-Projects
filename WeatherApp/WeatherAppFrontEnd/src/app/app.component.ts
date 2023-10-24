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
  selectedWeather: any;
  weatherData: any  | undefined;
  weatherDays: String[] = [];
  DateCache: Date = new Date();
  daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.cityForm = this.fb.group({
      cityName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  openModal(weather: any) {
    this.selectedWeather = weather;
    console.log(this.selectedWeather)
  }

  onSubmit() {
    const cityNameControl = this.cityForm.get('cityName');
    if (cityNameControl != null) {
      if (cityNameControl.valid) {
        const cityName = cityNameControl.value;
        this.weatherService.getWeather(cityName).subscribe(
          data => {
            this.weatherData = data;
            console.log(this.weatherData)
            this.dateOfTheWeek();
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  dateOfTheWeek() {
    for (let i = 0; i < this.weatherData.forecast.forecastday.length; i++) {
    this.DateCache = new Date(this.weatherData.forecast.forecastday[i].date) 
    this.weatherDays.push(this.daysOfTheWeek[this.DateCache.getDay()]);
    }
  }
}
