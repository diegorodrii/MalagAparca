import { AfterViewInit, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup, IonDatetime } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject, interval } from 'rxjs';
import { LocaleService } from '../../services/locale.service';

export const SPECIAL_DATETIME_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SpecialDatetimeComponent),
  multi: true
};

@Component({
  selector: 'app-special-datetime',
  templateUrl: './special-datetime.component.html',
  styleUrls: ['./special-datetime.component.scss'],
  providers: [SPECIAL_DATETIME_VALUE_ACCESSOR]
})
export class SpecialDatetimeComponent implements OnInit, ControlValueAccessor, OnDestroy {
  hasValue = false;
  maxDate: string; // Fecha máxima permitida (en formato 'YYYY-MM-DD')

  constructor(
    public locale: LocaleService
  ) {

  }

  ngOnDestroy(): void {
    this.dateSubject.complete();
  }

  private dateSubject = new BehaviorSubject(this.formatDate(moment()));
  public date$ = this.dateSubject.asObservable();
  propagateChange = (_: any) => { }

  isDisabled: boolean = false;

  formatDate(date: moment.Moment) {
    return date.format('YYYY-MM-DDTHH:mmZ');
  }

  ngOnInit() {
    this.maxDate = moment().format('YYYY-MM-DDTHH:mm');
  }

  writeValue(obj: any): void {
    if (obj) {
      this.hasValue = true;
      this.dateSubject.next(this.formatDate(moment(obj)));
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  
  onDateTimeChanged(event, accordion: IonAccordionGroup) {
    var selectedDate = moment(event.detail.value);
    var currentDate = moment();
  
    if (selectedDate.isAfter(currentDate)) {
      // La fecha seleccionada es posterior a la fecha actual, no se realiza ningún cambio
      return;
    }
  
    var value = this.formatDate(selectedDate);
  
    if (value != this.dateSubject.getValue()) {
      this.hasValue = true;
      this.dateSubject.next(value);
      this.propagateChange(value);
    }
  }
  
  onCancel(datetime: IonDatetime, accordion: IonAccordionGroup) {
    datetime.cancel();
  }
  
  onConfirm(datetime: IonDatetime, accordion: IonAccordionGroup) {
    accordion.value = '';
  }
}
