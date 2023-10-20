import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Currency } from 'src/app/types/currency';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
})
export class CurrencySelectorComponent implements OnInit {
  @Input() name!: string;
  @Input() currencies!: Currency[];

  @Output() currencySelected = new EventEmitter<string>();

  selectedCurrency: string = '';

  onCurrencySelect() {
    this.currencySelected.emit(this.selectedCurrency);
  }

  ngOnInit(): void {
    if (this.currencies && this.currencies.length > 0) {
      this.selectedCurrency = this.currencies[0].name;
    }
    this.onCurrencySelect();
  }
}
