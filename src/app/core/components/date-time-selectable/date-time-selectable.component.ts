import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { IonAccordionGroup, IonDatetime } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { LocaleService } from '../../services/locale.service';

export const DATETIME_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-date-time-selectable',
  templateUrl: './date-time-selectable.component.html',
  styleUrls: ['./date-time-selectable.component.scss'],
  providers: [DATETIME_PROFILE_VALUE_ACCESSOR]
})
export class DateTimeSelectableComponent implements OnInit, ControlValueAccessor, OnDestroy {
  hasValue = false;
  dateError: string;
  dateForm: FormGroup;
  todayDate: string;

  constructor(
    public locale: LocaleService,
    private formBuilder: FormBuilder
  ) { }

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
    this.dateForm = this.formBuilder.group({
      selectedDate: [moment().add(1, 'minute').format('YYYY-MM-DDTHH:mm'), Validators.required]
    });
  
    const currentDateTime = moment();
    this.todayDate = this.formatDate(currentDateTime);
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

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onDateTimeChanged(event, accordion: IonAccordionGroup) {
    setTimeout(() => {
      const selectedDateTime = moment(event.detail.value);
      const currentDateTime = moment();
  
      if (selectedDateTime.isSameOrBefore(currentDateTime)) {
        this.dateError = 'Seleccione una fecha y hora válidas.';
        return;
      }
  
      this.dateError = null;
      const value = this.formatDate(selectedDateTime);
  
      if (value !== this.dateSubject.getValue()) {
        this.hasValue = true;
        this.dateSubject.next(value);
        accordion.value = '';
        this.propagateChange(value);
      }
    }, 100);
  }
  
  

  onCancel(datetime: IonDatetime, accordion: IonAccordionGroup) {
    datetime.cancel();
    accordion.value = '';
  }

  onConfirm(datetime: IonDatetime, accordion: IonAccordionGroup) {
    datetime.confirm();
  }
}
