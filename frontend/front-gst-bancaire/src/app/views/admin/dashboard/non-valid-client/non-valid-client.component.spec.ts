import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonValidClientComponent } from './non-valid-client.component';

describe('NonValidClientComponent', () => {
  let component: NonValidClientComponent;
  let fixture: ComponentFixture<NonValidClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonValidClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonValidClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
