import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private backendUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get(`${this.backendUrl}/weather?city=${city}`);
  }
}
