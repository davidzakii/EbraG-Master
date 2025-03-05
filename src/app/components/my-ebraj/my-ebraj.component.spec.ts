import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEbrajComponent } from './my-ebraj.component';

describe('MyEbrajComponent', () => {
  let component: MyEbrajComponent;
  let fixture: ComponentFixture<MyEbrajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEbrajComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEbrajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
