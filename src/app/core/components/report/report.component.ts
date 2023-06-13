import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Report } from '../../models';
import { LocaleService } from '../../services/locale.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  imageUrl:string = ""

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() report:Report;
  constructor(
    public locale:LocaleService,
    private storageService: StorageService

  ) { }

  ngOnInit() {
    if(this.report){
      // console.log(this.imageService.getImageUrlByName(this.dishInput?.image))
      console.log(this.report)
    }
      this.storageService.getImageUrlByName(this.report!.picture).subscribe(
        url => {
          console.log(url);
          this.imageUrl = url;
        },
        error => console.log(error)
      );

  
  }

  onEditClick(){
    this.onEdit.emit(this.report);
  }

  onDeleteClick(){
    this.onDelete.emit(this.report);
  }

}
