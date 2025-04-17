import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobCategoryComponent } from './update-job-category.component';

describe('UpdateJobCategoryComponent', () => {
  let component: UpdateJobCategoryComponent;
  let fixture: ComponentFixture<UpdateJobCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateJobCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateJobCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
