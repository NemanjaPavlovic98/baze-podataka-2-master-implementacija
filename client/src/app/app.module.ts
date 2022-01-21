import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DokumentaModule } from './dokumenta/dokumenta.module';

import { AppComponent } from './app.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DatePipe } from '@angular/common';
import { ErrorInterceptor } from './utilities/error.interceptor';
import { PorudzbineModule } from './porudzbine/porudzbine.module';
import { PreduzeceModule } from './preduzece/preduzece.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    DokumentaModule,
    PorudzbineModule,
    PreduzeceModule,
    AppRoutingModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
