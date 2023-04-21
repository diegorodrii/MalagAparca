import { Component, OnInit } from '@angular/core';
import { MyParkService } from 'src/app/core/services';

@Component({
  selector: 'app-my-park',
  templateUrl: './my-park.component.html',
  styleUrls: ['./my-park.component.scss'],
})
export class MyParkComponent implements OnInit {

  constructor(private parkSVC : MyParkService) { }

  ngOnInit() {}

  getParks(){
    return this.parkSVC.park$;
  }

 

}
