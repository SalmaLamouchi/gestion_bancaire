import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddClientComponent } from './admin-add-client.component';

describe('AdminAddClientComponent', () => {
  let component: AdminAddClientComponent;
  let fixture: ComponentFixture<AdminAddClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
