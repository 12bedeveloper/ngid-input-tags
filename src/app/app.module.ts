import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgidInputModule } from './ngid-input-tags/ngid-input.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgidInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
