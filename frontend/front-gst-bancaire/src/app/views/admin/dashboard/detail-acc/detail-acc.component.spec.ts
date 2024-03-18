import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccComponent } from './detail-acc.component';

describe('DetailAccComponent', () => {
  let component: DetailAccComponent;
  let fixture: ComponentFixture<DetailAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
