import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.categories$ = this.db.list('/categories').snapshotChanges();
  }

  getAll() {
    return this.categories$.pipe(
      map((changes) => {
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
}
