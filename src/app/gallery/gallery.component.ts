import { Component, OnInit } from '@angular/core';
import { GalleryImage } from '../_models/gallery-image';
import { GalleryImagesService } from '../_services/gallery-images.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {
  images: GalleryImage[];
  imageLoading: boolean = true;

  constructor(private galleryService: GalleryImagesService) {}

  ngOnInit(): void {
    this.galleryService.getAll().subscribe((data) => {
      this.images = data;
    });
  }

  onLoad() {
    this.imageLoading = false;
  }
}
