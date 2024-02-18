import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListClientsComponent } from './admin-list-clients.component';

describe('AdminListClientsComponent', () => {
  let component: AdminListClientsComponent;
  let fixture: ComponentFixture<AdminListClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
