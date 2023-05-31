import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Report } from '../../models';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {


  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() report:Report;
  constructor(
    public locale:LocaleService

  ) { }

  ngOnInit() {}

  onEditClick(){
    this.onEdit.emit(this.report);
  }

  onDeleteClick(){
    this.onDelete.emit(this.report);
  }

}
