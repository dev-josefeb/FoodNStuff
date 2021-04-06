import { TestBed } from '@angular/core/testing';

import { GalleryImagesService } from './gallery-images.service';

describe('GalleryImagesService', () => {
  let service: GalleryImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
