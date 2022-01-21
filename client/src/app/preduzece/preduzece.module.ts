import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreduzeceRoutingModule } from './preduzece-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { FormaProizvodaComponent } from './proizvodi/forma/forma.component';
import { EditProizvodComponent } from './proizvodi/edit-proizvod/edit-proizvod.component';
import { CeneComponent } from './proizvodi/cene/cene.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { JedinicaMereComponent } from './jedinica-mere/jedinica-mere.component';



@NgModule({
  declarations: [
    ProizvodiComponent,
    FormaProizvodaComponent,
    EditProizvodComponent,
    CeneComponent,
    ZaposleniComponent,
    JedinicaMereComponent,
  ],
  imports: [
    CommonModule,
    PreduzeceRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class PreduzeceModule { }
