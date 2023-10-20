import { Component, OnInit } from '@angular/core';
import { MonoAPIService } from 'src/app/services/mono-api.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  _exchangeRate: any = [];

  usdRateBuy: number = 0;
  usdRateSell: number = 0;
  euRateBuy: number = 0;
  euRateSell: number = 0;

  constructor(private MonoAPIService: MonoAPIService) {}

  ngOnInit(): void {
    this.fetchExchangeRate();
    interval(10000) // 60 seconds (adjust as needed)
      .pipe(take(1)) // Fetch data only once
      .subscribe(() => {
        this.fetchExchangeRate();
      });
  }

  fetchExchangeRate() {
    this.MonoAPIService.getCurencies().subscribe((data) => {
      this._exchangeRate = data.slice(0, 3);
      if (this._exchangeRate.length > 0) {
        this.usdRateBuy = Math.round(this._exchangeRate[0].rateBuy * 100) / 100;
        this.usdRateSell = Math.round((this._exchangeRate[0].rateSell) * 100) / 100;
        this.euRateBuy = Math.round(this._exchangeRate[1].rateBuy * 100) / 100;
        this.euRateSell =  Math.round((this._exchangeRate[1].rateSell) * 100) / 100;
      }
    });
  }
}
