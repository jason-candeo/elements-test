import { TestBed, inject } from '@angular/core/testing';

import { ImgRatioService } from './img-ratio.service';

describe('ImgRatioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgRatioService]
    });
  });

  it('should be created', inject([ImgRatioService], (service: ImgRatioService) => {
    expect(service).toBeTruthy();
  }));
});
