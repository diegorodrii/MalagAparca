import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AssignmentDetailComponent } from '../core/components/assignment-detail/assignment-detail.component';
import { AssignmentsService, ParksService, UserDetailComponent } from '../core';
import { PeopleService } from '../core/services/people.service';
import { ParkDetailComponent } from '../core/components/park-detail/park-detail.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public folder:string;
  constructor(private peopleSVC:PeopleService,
    private parksSVC: ParksService,
    private assignmentsSVC: AssignmentsService,
    private modal: ModalController,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }
    async presentForm(_class, onDismiss:(any)=>void){
      const modal = await this.modal.create({
        component:_class,
        cssClass:"modal-full-right-side"
      });
      modal.present();
      modal.onDidDismiss().then(result=>{
        if(result && result.data){
          onDismiss(result.data);
        }
      });
    }
  
    onNewItem(){
      switch(this.folder){

        case 'People':
          this.presentForm(UserDetailComponent, (data)=>{
            this.peopleSVC.addUser(data.user);
          });
          break;
        case 'Parks':
          this.presentForm(ParkDetailComponent, (data)=>{
            this.parksSVC.addPark(data.park);
          });
          break;
        case 'Assignments':
          
          this.presentForm(AssignmentDetailComponent, (data)=>{
            this.assignmentsSVC.addAssignment(data.assignment);
          });
          break;
        case 'Task Panel':
          break;
        default:
      }
    }
}
