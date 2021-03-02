import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from './../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireDatabaseModule, AngularFireAuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
