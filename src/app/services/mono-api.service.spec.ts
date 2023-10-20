import { TestBed } from '@angular/core/testing';

import { MonoAPIService } from './mono-api.service';

describe('MonoAPIService', () => {
  let service: MonoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
