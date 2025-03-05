import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSideTabComponent } from './add-side-tab.component';

describe('AddSideTabComponent', () => {
  let component: AddSideTabComponent;
  let fixture: ComponentFixture<AddSideTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSideTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSideTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
