import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'https://api.monobank.ua/bank/currency';

@Injectable({
  providedIn: 'root'
})
export class MonoAPIService {

  constructor(
    private http: HttpClient
  ) { }

  getCurencies() {
    return this.http.get<any>(API_URL);
  }
}
