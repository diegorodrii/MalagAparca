import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Parking } from '../../models';
import { MyParkService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
})
export class ParkingComponent implements OnInit {
  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() parking:Parking;
  constructor() { }

  ngOnInit() {}

  onEditClick(){
    this.onEdit.emit(this.parking);
  }

  onDeleteClick(){
    this.onDelete.emit(this.parking);
  }



  // form: FormGroup;
  // mode: "New" | "Edit" = "New";
  // currentImage = new BehaviorSubject<string>("");
  // currentImage$ = this.currentImage.asObservable();
  // @Input('parking') set parking(parking: Parking) {
  //   if (parking) {
  //     this.form.controls.id.setValue(parking.id);
  //     this.form.controls.docId.setValue(parking.uid);
  //     this.form.controls.number.setValue(parking.number);
  //     this.form.controls.empty.setValue(parking.empty);
  //     this.form.controls.published.setValue(parking.published);
  //     this.mode = "Edit";
  //   }
  // }


  // constructor(
  //   private fb: FormBuilder,
  //   private modal: ModalController,
  //   private cdr: ChangeDetectorRef
  // ) {
  //   this.form = this.fb.group({
  //     id: [null],
  //     docId: [''],
  //     number: ['', [Validators.required]],
  //     empty: ['', [Validators.required]],
  //     published: ['', [Validators.required]],
  //   });
  // }

  // ngOnInit() {

  // }

  // onSubmit() {

  //   this.modal.dismiss({ parking: this.form.value, mode: this.mode }, 'ok');
  // }

  // onDismiss(result) {
  //   this.modal.dismiss(null, 'cancel');
  // }
}
