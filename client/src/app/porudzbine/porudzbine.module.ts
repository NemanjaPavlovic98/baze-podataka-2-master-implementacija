import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PorudzbineRoutingModule } from './porudzbine-routing.module';
import { UliceComponent } from './ulice/ulice.component';
import { MestaComponent } from './mesta/mesta.component';
import { KlijentiComponent } from './klijenti/klijenti.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UliceComponent,
    MestaComponent,
    KlijentiComponent,
  ],
  imports: [
    CommonModule,
    PorudzbineRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class PorudzbineModule { }
