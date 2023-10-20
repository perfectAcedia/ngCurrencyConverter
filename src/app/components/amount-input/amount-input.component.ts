import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Currency } from 'src/app/types/currency';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
})
export class AmountInputComponent implements OnInit {
  @Input() amount: number = 1;
  @Input() currencies: Currency[] = [];
  @Input() currency: string = '';


  @Output() valueChanged = new EventEmitter<number>();

  private inputSubject = new Subject<number>();

  constructor() {
    this.inputSubject.pipe(debounceTime(500)).subscribe(() => {
      this.updateResult();
    });
  }

  onInputChange() {
    this.inputSubject.next(this.amount);
  }

  updateResult() {
    this.valueChanged.emit(this.amount);
  }

  ngOnInit(): void {
    this.updateResult();
  }
}
