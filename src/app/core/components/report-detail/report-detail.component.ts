import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlatformService } from '../../services/platform.service';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { BehaviorSubject } from 'rxjs';
import { Report } from '../../models';
import * as moment from 'moment';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
})
export class ReportDetailComponent implements OnInit {
  minDate: string; // Fecha mínima permitida (en formato 'YYYY-MM-DDTHH:mm')

  form: FormGroup;
  mode: "New" | "Edit" = "New";
  allowPastTime = false;
  
  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();
  @Input('report') set report(report: Report) {
    if (report) {
      this.form.controls.id.setValue(report.id);
      this.form.controls.docId.setValue(report.docId);
      this.form.controls.title.setValue(report.title);
      this.form.controls.description.setValue(report.description);
      this.form.controls.date.setValue(report.date);
      this.form.controls.picture.setValue(report.picture);
      if (report.picture)
        this.currentImage.next(report.picture);
      this.mode = "Edit";
    }
  }


  constructor(
    public platform: PlatformService,
    private photoSvc: PhotoService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private modal: ModalController,
    private storageService: StorageService
  ) {
    this.form = this.fb.group({
      id: [null],
      docId: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: [null, [Validators.required]],
      picture: [''],
    });
  }

  ngOnInit() {
    this.minDate = moment().subtract(1, 'hour').format('YYYY-MM-DDTHH:mm');

  }

  onSubmit() {

    this.modal.dismiss({ report: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result) {
    this.modal.dismiss(null, 'cancel');
  }
  onChangeDateTime(dateTime){
    this.form.controls.dateTime.setValue(dateTime);
  }
  uploadImage($event:any){
    this.storageService.uploadImage($event)
  }

}
