import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Place } from '../../models';
import { MyParkService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-place-detail',
  templateUrl: './my-place-detail.component.html',
  styleUrls: ['./my-place-detail.component.scss'],
})
export class MyPlaceDetailComponent implements OnInit {


  form: FormGroup;
  mode: "New" | "Edit" = "New";
  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();
  @Input('place') set place(place: Place) {
    if (place) {
      this.form.controls.id.setValue(place.id);
      this.form.controls.docId.setValue(place.docId);
      this.form.controls.number.setValue(place.number);
      this.form.controls.empty.setValue(place.empty);
      this.form.controls.published.setValue(place.published);
      this.mode = "Edit";
    }
  }


  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      id: [null],
      docId: [''],
      number: ['', [Validators.required]],
      empty: ['', [Validators.required]],
      published: ['', [Validators.required]],
    });
  }

  ngOnInit() {

  }

  onSubmit() {

    this.modal.dismiss({ place: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result) {
    this.modal.dismiss(null, 'cancel');
  }


}
