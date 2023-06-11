  import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { Parking, Place } from '../../models';
  import { MyParkService, UserService } from '../../services';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { BehaviorSubject, Observable } from 'rxjs';
  import { ModalController } from '@ionic/angular';
  import { LocaleService } from '../../services/locale.service';

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
    private async loadPlaceAndPerson(a:Parking){
      this._place.next(await this.parkSVC.getPlaceById(a.placeId));
    }
    get parking():Parking{
      return this._parking;
    }

    private _parking:Parking;

    private _place:BehaviorSubject<Place> = new BehaviorSubject<Place>(null);
    place$:Observable<Place> = this._place.asObservable();

    userEmail: string; // Propiedad para almacenar el email del usuario logueado

    
    constructor(
      private userService: UserService,
      private parkSVC: MyParkService,
      public locale:LocaleService

    ) {
      this.userService.user$.subscribe(user => {
        this.userEmail = user?.email; // Obtener el email del usuario logueado
      });

    }

    ngOnInit() {}

    onEditClick(){
      console.log(this.parking.startsAt)
      console.log(this.parking.finishsAt)
      this.onEdit.emit(this.parking);
    }

    onDeleteClick(){
      this.onDelete.emit(this.parking);
    }

    onHireClick(){
      this.onHire.emit(this.parking)
    }

    
  }
