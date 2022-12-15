import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectFinishDatetimeComponent } from './select-finish-datetime.component';

describe('SelectFinishDatetimeComponent', () => {
  let component: SelectFinishDatetimeComponent;
  let fixture: ComponentFixture<SelectFinishDatetimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFinishDatetimeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectFinishDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
