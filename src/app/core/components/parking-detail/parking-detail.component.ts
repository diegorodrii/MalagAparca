import { Component, Input, OnInit } from '@angular/core';
import { MyParkService } from '../../services/my-park.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ParkingService } from '../../services/parking.service';
import { Parking, Place } from '../../models';
import { UserService } from '../..';
import { take } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.scss'],
})
export class ParkingDetailComponent implements OnInit {
  form: FormGroup;
  mode: 'New' | 'Edit' = 'New';

  @Input('parking') set parking(parking: Parking) {
    if (parking) {
      this.form.patchValue(parking);
      this.mode = 'Edit';
    } else {
      this.form.reset();
      this.form.controls.docId.setValue(null);
      this.mode = 'New';
    }
  }
  
  constructor(
    private userSVC: UserService,
    private parkingsSVC: ParkingService,
    private fb: FormBuilder,
    private modal: ModalController,
    private translate: TranslateService,
    private parkSVC: MyParkService
  ) {
    this.form = this.fb.group(
      {
        id: [0],
        docId:[null],
        placeId: [-1, [Validators.min(1)]],
        placeOwner: [null, Validators.min(1)],
        tenantEmail: ['Vacío'],
        startsAt: [null, [Validators.required]],
        finishsAt: [null, [Validators.required]],
      },
      { validators: [this.customFormValidator, this.minDurationValidator] }
    );
  }

  ngOnInit() {
    this.userSVC.user$.pipe(take(1)).subscribe((user) => {
      this.form.controls.placeOwner.setValue(user.email);
    });
  }

  onSubmit() {
    if (this.isDurationValid()) {
      this.modal.dismiss({ parking: this.form.value, mode: this.mode }, 'ok');
    }
  }

  onDismiss(result) {
    this.modal.dismiss(null, 'cancel');
  }

  customFormValidator = (formGroup: FormGroup): ValidationErrors | null => {
    const startsAt = formGroup.controls.startsAt.value;
    const finishsAt = formGroup.controls.finishsAt.value;

    if (startsAt && finishsAt && moment(finishsAt).isBefore(moment(startsAt))) {
      formGroup.controls.finishsAt.setErrors({ finishsAtBeforeStartsAt: true });
      return { finishsAtBeforeStartsAt: true };
    }

    return null;
  }

  minDurationValidator = (control: AbstractControl): ValidationErrors | null => {
    const startsAt = control.get('startsAt').value;
    const finishsAt = control.get('finishsAt').value;

    if (startsAt && finishsAt) {
      const duration = moment.duration(moment(finishsAt).diff(moment(startsAt)));
      const minutes = duration.asMinutes();

      if (minutes < 30) {
        control.get('finishsAt').setErrors({ minDuration: true });
        return { minDuration: true };
      }
    }

    return null;
  }

  isDurationValid(): boolean {
    return !this.form.controls.finishsAt.errors || !this.form.controls.finishsAt.errors.minDuration;
  }
}
