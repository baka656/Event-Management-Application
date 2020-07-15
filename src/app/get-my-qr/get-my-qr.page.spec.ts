import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetMyQrPage } from './get-my-qr.page';

describe('GetMyQrPage', () => {
  let component: GetMyQrPage;
  let fixture: ComponentFixture<GetMyQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMyQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetMyQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
