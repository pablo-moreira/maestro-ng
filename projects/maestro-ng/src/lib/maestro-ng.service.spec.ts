import { TestBed } from '@angular/core/testing';

import { MaestroNgService } from './maestro-ng.service';

describe('MaestroNgService', () => {
  let service: MaestroNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaestroNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
