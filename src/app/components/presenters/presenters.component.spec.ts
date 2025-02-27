import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentersComponent } from './presenters.component';

describe('PresentersComponent', () => {
  let component: PresentersComponent;
  let fixture: ComponentFixture<PresentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
