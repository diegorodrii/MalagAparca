import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup, IonDatetime } from '@ionic/angular';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectFinishDatetimeComponent),
  multi: true
};

@Component({
  selector: 'app-select-finish-datetime',
  templateUrl: './select-finish-datetime.component.html',
  styleUrls: ['./select-finish-datetime.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]

})
export class SelectFinishDatetimeComponent implements OnInit {

  hasValue = false;
  
  ngOnDestroy(): void {
    this.dateSubject.complete();
  }

  private dateSubject = new BehaviorSubject(this.formatDate(moment()));
  public date$ = this.dateSubject.asObservable();
  propagateChange = (_: any) => { }

  isDisabled:boolean = false;

  formatDate(date:moment.Moment){
    return date.format('YYYY-MM-DDTHH:mmZ');
  }

  ngOnInit() {
  }

  writeValue(obj: any): void { 
    if(obj){
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

  onFinishsAtChanged(event, accordion:IonAccordionGroup){ 
    setTimeout(() => {
      var value = this.formatDate(moment(event.detail.value));
      if(value!=this.dateSubject.getValue())
      {
        this.hasValue = true;

        this.dateSubject.next(value); 

        accordion.value = '';
        
        this.propagateChange(value);
      }
      
    }, 100);
  }

  onCancel(datetime:IonDatetime, accordion){
    datetime.cancel();
    accordion.value='';
  }

  onConfirm(datetime:IonDatetime, accordion){
    datetime.confirm();
  }

}
