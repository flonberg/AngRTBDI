import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRTBDIComponent } from './get-rtbdi.component';

describe('GetRTBDIComponent', () => {
  let component: GetRTBDIComponent;
  let fixture: ComponentFixture<GetRTBDIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetRTBDIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetRTBDIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
