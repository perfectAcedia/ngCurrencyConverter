import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'https://restcountries.com/v3.1/all?fields=currencies';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries() {
    return this.http.get<any>(API_URL);
  }
}
