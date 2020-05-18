import { TestBed } from '@angular/core/testing';

import { PageAuthService } from './page-auth.service';

describe('PageAuthService', () => {
  let service: PageAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
