import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://v6.exchangerate-api.com/v6/91f092d6c7ae278440b0e5d1/latest/USD';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient
  ) { }

  getCurencies() {
    return this.http.get<any>(API_URL);
  }
}
