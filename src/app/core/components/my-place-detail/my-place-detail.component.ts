import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Place } from '../../models';
import { MyParkService } from '../../services';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-place-detail',
  templateUrl: './my-place-detail.component.html',
  styleUrls: ['./my-place-detail.component.scss'],
})
export class MyPlaceDetailComponent implements OnInit {

  numberMaxError = false;
  form: FormGroup;
  mode: "New" | "Edit" = "New";
  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();
  @Input('place') set place(place: Place) {
    console.log("Received place:", place);
    if (place) {
      this.form.controls.id.setValue(place.id);
      this.form.controls.docId.setValue(place.docId);
      this.form.controls.number.setValue(place.number);
      this.mode = "Edit";
    }
  }
  


  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    private cdr: ChangeDetectorRef,
    private myParkService: MyParkService
  ) {
    this.form = this.fb.group({
      id: [null],
      docId: [''],
      number: ['', [Validators.required]],
      state: ['Vacío', [Validators.required]],
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.form.valid) {
      const numberValue = this.form.controls.number.value;
  
      // Verificar si ya existe un lugar con el mismo número
      const existingPlace = this.myParkService.getPlaces().find(p => p.number === numberValue);
      if (existingPlace && this.mode === 'New') {
        this.form.controls.number.setErrors({ duplicateNumber: true });
        return;
      }
      if (numberValue > 80) {
        this.form.controls.number.setErrors({ maxNumber: true });
        return;
      } else {
        this.form.controls.number.setErrors(null);
      }
    }
    this.modal.dismiss({ place: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result) {
    this.modal.dismiss(null, 'cancel');
  }
  hasFormError(error: string): boolean {
    return this.form?.errors && Object.keys(this.form.errors).filter(e => e == error).length == 1;
  }
  errorsToArray(controlErrors: ValidationErrors | null): string[] {
    if (!controlErrors) {
      return [];
    }
    return Object.keys(controlErrors);
  }

  

}
