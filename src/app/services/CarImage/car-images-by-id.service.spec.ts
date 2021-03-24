import { TestBed } from '@angular/core/testing';

import { CarImagesByIdService } from './car-images-by-id.service';

describe('CarImagesByIdService', () => {
  let service: CarImagesByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarImagesByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
