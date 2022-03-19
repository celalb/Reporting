/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EncrDecrService } from './encr-decr.service';

describe('Service: EncrDecr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncrDecrService]
    });
  });

  it('should ...', inject([EncrDecrService], (service: EncrDecrService) => {
    expect(service).toBeTruthy();
  }));
});
