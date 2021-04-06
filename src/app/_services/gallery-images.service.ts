import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GalleryImagesService {
  galleryImages$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.galleryImages$ = this.db.list('/gallery-images').snapshotChanges();
  }

  getAll() {
    return this.galleryImages$.pipe(
      map((changes) => {
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
}
