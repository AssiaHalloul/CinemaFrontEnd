import { TestBed } from '@angular/core/testing';

import { GallerieService } from './gallerie.service';

describe('GallerieService', () => {
  let service: GallerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GallerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
