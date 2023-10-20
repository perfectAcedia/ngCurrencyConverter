import { Component, OnInit } from '@angular/core';
import { Currency } from './types/currency';
import { CurrencyService } from './services/currency.service';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  _currencies: Currency[] = [];

  constructor(
    private currencyService: CurrencyService,
    private countriesService: CountriesService
  ) {}

  firstAmount: number = 1;
  secondAmount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'USD';

  handleFirstAmountChange(value: number) {
    if (value !== this.firstAmount) {
      this.firstAmount = value;
      this.calculateSecondAmount();
    }
  }

  handleSecondAmountChange(value: number) {
    if (value !== this.secondAmount) {
      this.secondAmount = value;
      this.calculateFirstAmount();
    }
  }

  handleFromCurrencySelected(currency: string) {
    if (currency !== this.fromCurrency) {
      this.fromCurrency = currency;
      this.calculateSecondAmount();
    }
  }

  handleToCurrencySelected(currency: string) {
    if (currency !== this.toCurrency) {
      this.toCurrency = currency;
      this.calculateSecondAmount();
    }
  }

  calculateFirstAmount() {
    const firstRate = this._currencies.find(
      (currency) => currency.name === this.fromCurrency
    )?.rate;
    const secondRate = this._currencies.find(
      (currency) => currency.name === this.toCurrency
    )?.rate;

    const rateBase = +firstRate! / +secondRate!;

    this.firstAmount = Math.round(this.secondAmount * rateBase * 100) / 100;
  }

  calculateSecondAmount() {
    const firstRate = this._currencies.find(
      (currency) => currency.name === this.fromCurrency
    )?.rate;
    const secondRate = this._currencies.find(
      (currency) => currency.name === this.toCurrency
    )?.rate;

    const rateBase = +secondRate! / +firstRate!;

    this.secondAmount = Math.round(this.firstAmount * rateBase * 100) / 100;
  }

  ngOnInit(): void {
    this.currencyService.getCurencies().subscribe((data) => {
      const currencyMap: Map<string, Currency> = new Map();

      for (const key in data.conversion_rates) {
        const value = data.conversion_rates[key];
        const currency: Currency = {
          rate: value,
          full_name: '',
          name: key,
          symbol: '',
        };
        currencyMap.set(key, currency);
      }

      this.countriesService.getCountries().subscribe((countryData) => {
        countryData.forEach((currency: any) => {
          const name = Object.keys(currency.currencies)[0];
          const existingCurrency = currencyMap.get(name);

          if (existingCurrency) {
            existingCurrency.full_name = currency.currencies[name].name;
            existingCurrency.symbol = currency.currencies[name].symbol;
          }
        });

        this._currencies = Array.from(currencyMap.values()).filter(
          (element) => element.full_name !== ''
        );
      });
    });
  }
}
