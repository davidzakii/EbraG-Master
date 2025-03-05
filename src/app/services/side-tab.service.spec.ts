import { TestBed } from '@angular/core/testing';

import { SideTabService } from './side-tab.service';

describe('SideTabService', () => {
  let service: SideTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
