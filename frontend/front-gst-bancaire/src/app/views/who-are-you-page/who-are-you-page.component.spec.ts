import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoAreYouPageComponent } from './who-are-you-page.component';

describe('WhoAreYouPageComponent', () => {
  let component: WhoAreYouPageComponent;
  let fixture: ComponentFixture<WhoAreYouPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoAreYouPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoAreYouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
