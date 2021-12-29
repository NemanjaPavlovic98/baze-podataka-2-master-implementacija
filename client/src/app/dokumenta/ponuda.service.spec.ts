import { TestBed } from '@angular/core/testing';

import { PonudaService } from './services/ponuda.service';

describe('PonudaService', () => {
  let service: PonudaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PonudaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
