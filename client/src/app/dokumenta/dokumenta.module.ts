import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnjigaTocejnaComponent } from './knjiga-tocejna/knjiga-tocejna.component';
import { UpdateKnjigaComponent } from './knjiga-tocejna/update-knjiga/update-knjiga.component';
import { RacunComponent } from './racun/racun.component';
import { StavkeRacunaComponent } from './racun/stavke-racuna/stavke-racuna.component';
import { FormaRacunComponent } from './racun/forma-racun/forma-racun.component';
import { PonudaComponent } from './ponuda/ponuda.component';
import { PonudaFormaComponent } from './ponuda/ponuda-forma/ponuda-forma.component';
import { OtpremnicaComponent } from './otpremnica/otpremnica.component';
import { DokumentaRoutingModule } from './dokumenta-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormaKnjigeTocenjaComponent } from './knjiga-tocejna/forma/forma.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    KnjigaTocejnaComponent,
    UpdateKnjigaComponent,
    RacunComponent,
    StavkeRacunaComponent,
    FormaRacunComponent,
    PonudaComponent,
    PonudaFormaComponent,
    OtpremnicaComponent,
    FormaKnjigeTocenjaComponent,
  ],
  imports: [
    CommonModule,
    DokumentaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [],
})
export class DokumentaModule {}
