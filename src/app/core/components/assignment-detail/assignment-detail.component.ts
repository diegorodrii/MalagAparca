import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Assignment } from '../../models';
import { AssignmentsService, ParksService, PeopleService } from '../../services';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss'],
})
export class AssignmentDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  button_text = "";
  @Input('assignment') set assignment(assignment:Assignment){
    if(assignment){
      this.form.controls.id.setValue(assignment.id);
      this.form.controls.idPark.setValue(assignment.idPark);
      this.form.controls.idUser.setValue(assignment.idUser);
      this.form.controls.finishsAt.setValue(assignment.finishsAt);

      this.mode = "Edit";
    }
  }
  constructor(
    private parksSVC: ParksService,
    private peopleSVC: PeopleService,
    private assignmentsSVC: AssignmentsService,
    private fb: FormBuilder,
    private modal: ModalController,
    private translateSVC : TranslateService
    
  ) { 
    this.form = this.fb.group({
      id:[null],
      idPark:[-1, [Validators.min(1)]],
      idUser:[-1, [Validators.min(1)]],
      finishsAt:[null, [Validators.required]],
    });
  }

  
   async ngOnInit() {
     if(this.mode == "Edit")
       this.button_text = await lastValueFrom(this.translateSVC.get('assignment.edit'));  
     else
       this.button_text = await this.translateSVC.get('assignment.new').toPromise();

   }

  onSubmit(){
    
    this.modal.dismiss({assignment: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

  onChangeDateTime(dateTime){
    this.form.controls.dateTime.setValue(dateTime);
  }

  onDateTime(){
    
  }


}
