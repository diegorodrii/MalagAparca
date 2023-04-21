import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

  constructor(public userSVC : UserService) { }

  ngOnInit() {}


}
