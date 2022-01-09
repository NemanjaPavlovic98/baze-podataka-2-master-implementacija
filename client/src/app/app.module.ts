import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ErrorInterceptor } from './utilities/error.interceptor';
import { MestaComponent } from './porudzbine/mesta/mesta.component';
import { JedinicaMereComponent } from './preduzece/jedinica-mere/jedinica-mere.component';
import { CeneComponent } from './preduzece/proizvodi/cene/cene.component';
import { KnjigaTocejnaComponent } from './dokumenta/knjiga-tocejna/knjiga-tocejna.component';
import { FormaKnjigeTocenjaComponent } from './dokumenta/knjiga-tocejna/forma/forma.component';
import { KlijentiComponent } from './porudzbine/klijenti/klijenti.component';
import { StavkeRacunaComponent } from './dokumenta/racun/stavke-racuna/stavke-racuna.component';
import { FormaRacunComponent } from './dokumenta/racun/forma-racun/forma-racun.component';

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
    MestaComponent,
    JedinicaMereComponent,
    CeneComponent,
    KnjigaTocejnaComponent,
    FormaKnjigeTocenjaComponent,
    KlijentiComponent,
    StavkeRacunaComponent,
    FormaRacunComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
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
