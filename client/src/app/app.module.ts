import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RacunComponent } from './dokumenta/racun/racun.component';
import { DokumentaComponent } from './dokumenta/dokumenta.component';
import { PonudaComponent } from './dokumenta/ponuda/ponuda.component';
import { DatePipe } from '@angular/common';
import { ZaposleniComponent } from './preduzece/zaposleni/zaposleni.component';
import { PonudaFormaComponent } from './dokumenta/ponuda/ponuda-forma/ponuda-forma.component';
import { ProizvodiComponent } from './preduzece/proizvodi/proizvodi.component';
import { FormaProizvodaComponent } from './preduzece/proizvodi/forma/forma.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    RacunComponent,
    DokumentaComponent,
    PonudaComponent,
    ZaposleniComponent,
    PonudaFormaComponent,
    ProizvodiComponent,
    FormaProizvodaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
