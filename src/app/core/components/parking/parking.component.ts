  import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { Parking, Place } from '../../models';
  import { MyParkService, UserService } from '../../services';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { BehaviorSubject, Observable, take } from 'rxjs';
  import { ModalController } from '@ionic/angular';
  import { LocaleService } from '../../services/locale.service';
import { StorageService } from '../../services/storage.service';

  @Component({
    selector: 'app-parking',
    templateUrl: './parking.component.html',
    styleUrls: ['./parking.component.scss'],
  })
  export class ParkingComponent implements OnInit {
    @Output() onEdit = new EventEmitter;
    @Output() onDelete = new EventEmitter;
    @Output() onHire = new EventEmitter;

    @Input('parking') set parking(a:Parking){
      this._parking = a;
      this.loadPlaceAndPerson(a);


    }
    
    private async loadPlaceAndPerson(a: Parking) {
      this._place.next(await this.parkSVC.getPlaceById(a.placeId));
      this.ownerPicture = await this.parkSVC.getOwnerPictureById(a.placeId); // Obtener ownerPicture

      this.storageService.getImageUrlByName(this.ownerPicture).subscribe(
        url => {
          console.log("URL OWNER: " + url);
          this.ownerImage = url;
        },
        error => console.log(error)
      );
    }
    get parking():Parking{
      return this._parking;
    }

    private _parking:Parking;

    private _place:BehaviorSubject<Place> = new BehaviorSubject<Place>(null);
    place$:Observable<Place> = this._place.asObservable();

    userEmail: string;

    ownerPicture: string = "" ;
    ownerImage : string = "" ;
    tenantImage : string = "" ;

    constructor(
      private userService: UserService,
      private parkSVC: MyParkService,
      public locale:LocaleService,
      private storageService:StorageService,
      private myParkService: MyParkService

    ) {
      this.userService.user$.subscribe(user => {
        this.userEmail = user?.email; // Obtener el email del usuario logueado
      });

    }

    ngOnInit() {
      this.loadPlaceAndPerson(this._parking); 
      this.storageService.getImageUrlByName(this.parking!.tenantPicture).subscribe(
        url => {
          this.tenantImage = url;
        },
        error => console.log(error)
      );
   
    }

    onEditClick(){

      this.onEdit.emit(this.parking);
    }

    onDeleteClick(){
      this.onDelete.emit(this.parking);
    }

    onHireClick(){
      this.onHire.emit(this.parking)
    }

  }
